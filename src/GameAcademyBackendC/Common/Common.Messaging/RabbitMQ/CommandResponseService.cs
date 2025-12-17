using System.Text;
using System.Text.Json;
using Common.Core.Abstractions.Interfaces.Services;
using Common.Core.Entities.Results;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Common.Messaging.RabbitMQ;

public class CommandResponseService : ICommandResponseService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly ILogger<CommandResponseService> _logger;
        private readonly string _exchangeName;
        private readonly Dictionary<string, TaskCompletionSource<object>> _pendingResponses;

        public CommandResponseService(
            IConfiguration configuration,
            ILogger<CommandResponseService> logger)
        {
            _logger = logger;
            _pendingResponses = new Dictionary<string, TaskCompletionSource<object>>();

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
            _exchangeName = configuration["RabbitMQ:ExchangeName"] ?? "gameacademy.exchange";

            ConfigureExchange();
            StartResponseConsumer();
        }

        private void ConfigureExchange()
        {
            _channel.ExchangeDeclare(
                exchange: _exchangeName,
                type: ExchangeType.Topic,
                durable: true);
        }

        private void StartResponseConsumer()
        {
            var replyQueue = _channel.QueueDeclare(
                queue: $"response-queue-{Guid.NewGuid()}",
                durable: false,
                exclusive: true,
                autoDelete: true);

            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.Received += async (model, ea) =>
            {
                await ProcessResponse(ea);
            };

            _channel.BasicConsume(
                queue: replyQueue.QueueName,
                autoAck: true,
                consumer: consumer);
        }

        public async Task<CommandResult<TResponse>> SendCommandAsync<TCommand, TResponse>(
            TCommand command, string routingKey, TimeSpan? timeout = null)
            where TCommand : class where TResponse : class
        {
            var correlationId = Guid.NewGuid().ToString();
            var tcs = new TaskCompletionSource<object>();
            _pendingResponses[correlationId] = tcs;

            var props = _channel.CreateBasicProperties();
            props.CorrelationId = correlationId;
            props.ReplyTo = _channel.CurrentQueue; // Будет переопределено consumer'ом
            props.ContentType = "application/json";

            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(command));
            
            _channel.BasicPublish(
                exchange: _exchangeName,
                routingKey: routingKey,
                basicProperties: props,
                body: body);

            timeout ??= TimeSpan.FromSeconds(30);
            
            var completedTask = await Task.WhenAny(
                tcs.Task,
                Task.Delay(timeout.Value));

            if (completedTask == tcs.Task)
            {
                _pendingResponses.Remove(correlationId);
                return (CommandResult<TResponse>)await tcs.Task;
            }
            
            _pendingResponses.Remove(correlationId);
            throw new TimeoutException($"Command {routingKey} timed out");
        }

        public async Task<QueryResult<TResponse>> SendQueryAsync<TQuery, TResponse>(
            TQuery query, string routingKey, TimeSpan? timeout = null)
            where TQuery : class where TResponse : class
        {
            var correlationId = Guid.NewGuid().ToString();
            var tcs = new TaskCompletionSource<object>();
            _pendingResponses[correlationId] = tcs;

            var props = _channel.CreateBasicProperties();
            props.CorrelationId = correlationId;
            props.ReplyTo = _channel.CurrentQueue;
            props.ContentType = "application/json";

            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(query));
            
            _channel.BasicPublish(
                exchange: _exchangeName,
                routingKey: routingKey,
                basicProperties: props,
                body: body);

            timeout ??= TimeSpan.FromSeconds(30);
            
            var completedTask = await Task.WhenAny(
                tcs.Task,
                Task.Delay(timeout.Value));

            if (completedTask == tcs.Task)
            {
                _pendingResponses.Remove(correlationId);
                return (QueryResult<TResponse>)await tcs.Task;
            }
            
            _pendingResponses.Remove(correlationId);
            throw new TimeoutException($"Query {routingKey} timed out");
        }

        private async Task ProcessResponse(BasicDeliverEventArgs ea)
        {
            var correlationId = ea.BasicProperties.CorrelationId;
            
            if (!_pendingResponses.TryGetValue(correlationId, out var tcs))
                return;

            try
            {
                var body = ea.Body.ToArray();
                var responseJson = Encoding.UTF8.GetString(body);
                
                // Определяем тип результата по routing key или content type
                var result = JsonSerializer.Deserialize<object>(responseJson);
                tcs.TrySetResult(result);
            }
            catch (Exception ex)
            {
                tcs.TrySetException(ex);
            }
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
            GC.SuppressFinalize(this);
        }
    }