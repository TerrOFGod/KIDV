using Common.Core.Types;
using System.ComponentModel.DataAnnotations;

namespace Common.Core.DTOs.User;

public class ChangeRoleDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public UserRole NewRole { get; set; }
}
