namespace Common.Messaging.Events.User;

public class UserDeletedEvent : IntegrationEvent
{
    public string UserId { get; set; }
    public string Email { get; set; }
}
