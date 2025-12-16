using Common.Core.Types;

namespace Common.Core.Models.User;

public class User : BaseEntity
{
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public string PasswordHash { get; set; }
    public UserRole Role { get; set; } = UserRole.Guest;
    public bool IsActive { get; set; } = true;

    // For navigation
    public List<string> GameIds { get; set; } = new();
    public List<string> CommentIds { get; set; } = new();
}
