using System.ComponentModel.DataAnnotations;

namespace Common.Core.DTOs.User;

public class ChangePasswordDto
{
    [Required]
    [MinLength(6)]
    public string OldPassword { get; set; }

    [Required]
    [MinLength(6)]
    public string NewPassword { get; set; }
}
