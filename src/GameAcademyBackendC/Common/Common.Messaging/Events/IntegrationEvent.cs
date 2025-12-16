namespace Common.Messaging.Events;

public abstract class IntegrationEvent
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string EventType => GetType().Name;
}
