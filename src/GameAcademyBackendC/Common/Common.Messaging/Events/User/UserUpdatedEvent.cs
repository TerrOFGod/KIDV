using Common.Core.Types;

namespace Common.Messaging.Events.User;

public class UserUpdatedEvent : IntegrationEvent
{
    public string UserId { get; set; }
    public string DisplayName { get; set; }
    public UserRole Role { get; set; }
}
