using System.Text;
using System.Text.Json;
using AuthService.Queries.Queries;
using Common.CQRS.Base;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace AuthService.Queries.RabbitMQ;

public class QueryConsumer : BackgroundService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<QueryConsumer> _logger;
        private readonly string _queueName;

        public QueryConsumer(
            IConfiguration configuration,
            IServiceProvider serviceProvider,
            ILogger<QueryConsumer> logger)
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

            _queueName = configuration["RabbitMQ:QueryQueue"] ?? "auth.queries.queue";
            
            ConfigureQueue();
        }

        private void ConfigureQueue()
        {
            // Объявляем exchange для запросов
            _channel.ExchangeDeclare(
                exchange: "auth.queries.exchange",
                type: ExchangeType.Topic,
                durable: true);

            // Объявляем очередь запросов
            _channel.QueueDeclare(
                queue: _queueName,
                durable: true,
                exclusive: false,
                autoDelete: false);

            // Привязываем очередь к exchange
            _channel.QueueBind(
                queue: _queueName,
                exchange: "auth.queries.exchange",
                routingKey: "auth.query.*");

            _channel.BasicQos(prefetchSize: 0, prefetchCount: 10, global: false);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var consumer = new AsyncEventingBasicConsumer(_channel);
            
            consumer.Received += async (model, ea) =>
            {
                await ProcessQuery(ea, stoppingToken);
            };

            _channel.BasicConsume(
                queue: _queueName,
                autoAck: false,
                consumer: consumer);

            _logger.LogInformation("Query consumer started for queue: {QueueName}", _queueName);

            return Task.CompletedTask;
        }

        private async Task ProcessQuery(BasicDeliverEventArgs ea, CancellationToken cancellationToken)
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
                // Определяем тип запроса по routing key
                var queryType = GetQueryType(routingKey);
                if (queryType == null)
                {
                    _logger.LogWarning("Unknown query type for routing key: {RoutingKey}", routingKey);
                    _channel.BasicNack(ea.DeliveryTag, false, false);
                    return;
                }

                // Десериализуем запрос
                var query = JsonSerializer.Deserialize(message, queryType);
                if (query == null)
                {
                    _logger.LogWarning("Failed to deserialize query for routing key: {RoutingKey}", routingKey);
                    _channel.BasicNack(ea.DeliveryTag, false, false);
                    return;
                }

                // Устанавливаем CorrelationId если нужно
                if (query is BaseQuery<object> baseQuery)
                {
                    baseQuery.CorrelationId = correlationId ?? Guid.NewGuid().ToString();
                }

                // Выполняем запрос через MediatR
                var result = await mediator.Send(query, cancellationToken);

                // Отправляем ответ
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
                _logger.LogDebug("Query processed: {RoutingKey}", routingKey);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing query: {RoutingKey}", routingKey);
                
                // Отправляем ошибку
                if (!string.IsNullOrEmpty(replyTo))
                {
                    var errorResponse = new
                    {
                        Success = false,
                        Error = ex.Message,
                        ErrorCode = "QUERY_PROCESSING_ERROR",
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

        private Type GetQueryType(string routingKey)
        {
            return routingKey switch
            {
                "auth.query.get-profile" => typeof(GetUserProfileQuery),
                "auth.query.search-users" => typeof(SearchUsersQuery),
                "auth.query.get-all-users" => typeof(GetAllUsersQuery),
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
