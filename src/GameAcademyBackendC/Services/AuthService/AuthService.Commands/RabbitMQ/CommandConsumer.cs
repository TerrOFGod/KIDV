using System.Text;
using System.Text.Json;
using AuthService.Commands.Commands;
using Common.CQRS.Base;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace AuthService.Commands.RabbitMQ;

public class CommandConsumer : BackgroundService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<CommandConsumer> _logger;
        private readonly string _queueName;

        public CommandConsumer(
            IConfiguration configuration,
            IServiceProvider serviceProvider,
            ILogger<CommandConsumer> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;

            var factory = new ConnectionFactory
            {
                HostName = configuration["RabbitMQ:HostName"],
                Port = configuration.GetValue<int>("RabbitMQ:Port", 5672),
                UserName = configuration["RabbitMQ:UserName"],
                Password = configuration["RabbitMQ:Password"],
                DispatchConsumersAsync = true
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _queueName = configuration["RabbitMQ:CommandQueue"] ?? "auth.commands.queue";
            
            ConfigureQueue();
        }

        private void ConfigureQueue()
        {
            // Объявляем exchange для команд
            _channel.ExchangeDeclare(
                exchange: "auth.commands.exchange",
                type: ExchangeType.Topic,
                durable: true);

            // Объявляем очередь команд
            _channel.QueueDeclare(
                queue: _queueName,
                durable: true,
                exclusive: false,
                autoDelete: false);

            // Привязываем очередь к exchange
            _channel.QueueBind(
                queue: _queueName,
                exchange: "auth.commands.exchange",
                routingKey: "auth.command.*");

            _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var consumer = new AsyncEventingBasicConsumer(_channel);
            
            consumer.Received += async (model, ea) =>
            {
                await ProcessCommand(ea, stoppingToken);
            };

            _channel.BasicConsume(
                queue: _queueName,
                autoAck: false,
                consumer: consumer);

            _logger.LogInformation("Command consumer started for queue: {QueueName}", _queueName);

            return Task.CompletedTask;
        }

        private async Task ProcessCommand(BasicDeliverEventArgs ea, CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            var routingKey = ea.RoutingKey;
            var correlationId = ea.BasicProperties.CorrelationId;
            var replyTo = ea.BasicProperties.ReplyTo;

            try
            {
                // Определяем тип команды по routing key
                var commandType = GetCommandType(routingKey);
                if (commandType == null)
                {
                    _logger.LogWarning("Unknown command type for routing key: {RoutingKey}", routingKey);
                    _channel.BasicNack(ea.DeliveryTag, false, false);
                    return;
                }

                // Десериализуем команду
                var command = JsonSerializer.Deserialize(message, commandType);
                if (command == null)
                {
                    _logger.LogWarning("Failed to deserialize command for routing key: {RoutingKey}", routingKey);
                    _channel.BasicNack(ea.DeliveryTag, false, false);
                    return;
                }

                // Устанавливаем CorrelationId если нужно
                if (command is BaseCommand baseCommand)
                {
                    baseCommand.CorrelationId = correlationId ?? Guid.NewGuid().ToString();
                }

                // Выполняем команду через MediatR
                var result = await mediator.Send(command, cancellationToken);

                // Отправляем ответ если указан ReplyTo
                if (!string.IsNullOrEmpty(replyTo))
                {
                    var responseBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(result));
                    var responseProps = _channel.CreateBasicProperties();
                    responseProps.CorrelationId = correlationId;
                    responseProps.ContentType = "application/json";

                    _channel.BasicPublish(
                        exchange: "",
                        routingKey: replyTo,
                        basicProperties: responseProps,
                        body: responseBytes);
                }

                _channel.BasicAck(ea.DeliveryTag, false);
                _logger.LogDebug("Command processed: {RoutingKey}", routingKey);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing command: {RoutingKey}", routingKey);
                
                // Отправляем ошибку если есть ReplyTo
                if (!string.IsNullOrEmpty(replyTo))
                {
                    var errorResponse = new
                    {
                        Success = false,
                        Error = ex.Message,
                        ErrorCode = "COMMAND_PROCESSING_ERROR",
                        CorrelationId = correlationId
                    };

                    var responseBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(errorResponse));
                    var responseProps = _channel.CreateBasicProperties();
                    responseProps.CorrelationId = correlationId;
                    responseProps.ContentType = "application/json";

                    _channel.BasicPublish(
                        exchange: "",
                        routingKey: replyTo,
                        basicProperties: responseProps,
                        body: responseBytes);
                }

                _channel.BasicNack(ea.DeliveryTag, false, false);
            }
        }

        private Type GetCommandType(string routingKey)
        {
            return routingKey switch
            {
                "auth.command.register" => typeof(RegisterUserCommand),
                "auth.command.login" => typeof(LoginUserCommand),
                "auth.command.update-profile" => typeof(UpdateProfileCommand),
                "auth.command.change-password" => typeof(ChangePasswordCommand),
                "auth.command.change-role" => typeof(ChangeUserRoleCommand),
                "auth.command.delete-user" => typeof(DeleteUserCommand),
                _ => null
            };
        }

        public override void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
            base.Dispose();
        }
    }