using Common.Core.Types;

namespace AuthService.API.DTOs;

public class ChangeRoleRequest
{
    public string Email { get; set; }
    public UserRole NewRole { get; set; }
}