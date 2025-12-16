using System.ComponentModel.DataAnnotations;

namespace Common.Core.DTOs.User;

public class UpdateProfileDto
{
    [Required]
    public string Id { get; set; }

    public string DisplayName { get; set; }
}
