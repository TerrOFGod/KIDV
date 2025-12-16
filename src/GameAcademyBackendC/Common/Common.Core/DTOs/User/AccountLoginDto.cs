using System.ComponentModel.DataAnnotations;

namespace Common.Core.DTOs.User;

public class AccountLoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}
