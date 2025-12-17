namespace Common.Core.Abstractions.Interfaces.Services;

public interface IRabbitMQService : IDisposable
{
    void Publish<T>(T message, string routingKey) where T : class;
    void Subscribe<T>(string queueName, string routingKey, Func<T, Task> handler) where T : class;
    Task<TResponse> RequestAsync<TRequest, TResponse>(TRequest request, string routingKey,
        TimeSpan? timeout = null) where TRequest : class where TResponse : class;
}