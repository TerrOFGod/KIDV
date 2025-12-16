using Common.Core.Types;

namespace Common.Core.Models.User;

public class UserProfile
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public UserRole Role { get; set; }
    public DateTime CreatedAt { get; set; }
}
