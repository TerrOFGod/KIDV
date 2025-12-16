using Common.Core.Exceptions;
using Common.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text.Json;
using System.Text;

namespace Common.Messaging.RabbitMQ;

public class RabbitMQService : IRabbitMQService
{
    private readonly IConnection _connection;
    private readonly IChannel _channel;
    private readonly ILogger<RabbitMQService> _logger;
    private readonly string _exchangeName;
    private readonly Dictionary<string, AsyncEventingBasicConsumer> _consumers = new();

    public RabbitMQService(
        IConfiguration configuration,
        ILogger<RabbitMQService> logger)
    {
        _logger = logger;

        var factory = new ConnectionFactory
        {
            HostName = configuration["RabbitMQ:HostName"],
            Port = configuration.GetValue<int>("RabbitMQ:Port", 5672),
            UserName = configuration["RabbitMQ:UserName"],
            Password = configuration["RabbitMQ:Password"],
            DispatchConsumersAsync = true
        };

        _connection = await factory.CreateConnectionAsync();
        _channel = _connection.CreateChannelAsync();

        _exchangeName = configuration["RabbitMQ:ExchangeName"] ?? "accounts.topic.exchange";

        ConfigureExchange();
    }

    private async void ConfigureExchange()
    {
        // Declare topic exchange
        await _channel.ExchangeDeclareAsync(
            exchange: _exchangeName,
            type: ExchangeType.Topic,
            durable: true,
            autoDelete: false
        );
    }

    public void Publish<T>(T message, string routingKey) where T : class
    {
        try
        {
            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
            var properties = _channel.CreateBasicProperties();
            properties.Persistent = true;
            properties.Timestamp = new AmqpTimestamp(DateTimeOffset.UtcNow.ToUnixTimeSeconds());

            _channel.BasicPublish(
                exchange: _exchangeName,
                routingKey: routingKey,
                basicProperties: properties,
                body: body);

            _logger.LogDebug("Published message to {RoutingKey}: {@Message}", routingKey, message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error publishing message to {RoutingKey}", routingKey);
            throw;
        }
    }

    public void Subscribe<T>(string queueName, string routingKey, Func<T, Task> handler) where T : class
    {
        if (_consumers.ContainsKey(queueName))
            throw new AppException($"Queue {queueName} already has a consumer");

        // Declare queue
        _channel.QueueDeclare(
            queue: queueName,
            durable: true,
            exclusive: false,
            autoDelete: false);

        // Bind queue to exchange
        _channel.QueueBind(
            queue: queueName,
            exchange: _exchangeName,
            routingKey: routingKey);

        // Configure prefetch
        _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

        var consumer = new AsyncEventingBasicConsumer(_channel);
        consumer.ReceivedAsync += async (model, ea) =>
        {
            try
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var obj = JsonSerializer.Deserialize<T>(message);

                if (obj != null)
                {
                    await handler(obj);
                }

                _channel.BasicAck(ea.DeliveryTag, multiple: false);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing message from {QueueName}", queueName);
                _channel.BasicNack(ea.DeliveryTag, multiple: false, requeue: true);
            }
        };

        _channel.BasicConsume(
            queue: queueName,
            autoAck: false,
            consumer: consumer);

        _consumers[queueName] = consumer;
        _logger.LogInformation("Subscribed to queue {QueueName} with routing key {RoutingKey}",
            queueName, routingKey);
    }

    public async Task<TResponse> RequestAsync<TRequest, TResponse>(
        TRequest request, string routingKey, TimeSpan? timeout = null)
        where TRequest : class where TResponse : class
    {
        timeout ??= TimeSpan.FromSeconds(30);

        var correlationId = Guid.NewGuid().ToString();
        var replyQueueName = $"reply-{correlationId}";

        // Declare temporary reply queue
        var replyQueue = _channel.QueueDeclare(
            queue: replyQueueName,
            durable: false,
            exclusive: true,
            autoDelete: true);

        var tcs = new TaskCompletionSource<TResponse>();

        var consumer = new AsyncEventingBasicConsumer(_channel);
        consumer.ReceivedAsync += (model, ea) =>
        {
            if (ea.BasicProperties.CorrelationId == correlationId)
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                var obj = JsonSerializer.Deserialize<TResponse>(response);
                tcs.TrySetResult(obj);
            }
            return Task.CompletedTask;
        };

        _channel.BasicConsume(
            consumer: consumer,
            queue: replyQueueName,
            autoAck: true);

        // Publish request
        var requestBody = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(request));
        var properties = _channel.CreateBasicProperties();
        properties.CorrelationId = correlationId;
        properties.ReplyTo = replyQueueName;
        properties.Persistent = true;

        _channel.BasicPublish(
            exchange: _exchangeName,
            routingKey: routingKey,
            basicProperties: properties,
            body: requestBody);

        // Wait for response with timeout
        var completedTask = await Task.WhenAny(
            tcs.Task,
            Task.Delay(timeout.Value));

        if (completedTask == tcs.Task)
        {
            return await tcs.Task;
        }

        throw new TimeoutException($"Request to {routingKey} timed out after {timeout.Value.TotalSeconds} seconds");
    }

    public void Dispose()
    {
        _channel?.Close();
        _connection?.Close();
        GC.SuppressFinalize(this);
    }
}