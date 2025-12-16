using System.ComponentModel.DataAnnotations;

namespace Common.Core.DTOs.User;

public class AccountRegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }

    public string DisplayName { get; set; }
}
