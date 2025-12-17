using System.ComponentModel.DataAnnotations;
using Common.Core.Models.User;
using Common.CQRS.Base;
using FluentValidation;

namespace AuthService.Commands.Commands;

public class UpdateProfileCommand : BaseCommand<UserProfile>
{
    [Required]
    public string UserId { get; set; }

    [Required]
    public string DisplayName { get; }

    public UpdateProfileCommand(string userId, string displayName)
    {
        UserId = userId;
        DisplayName = displayName;
    }
}

public class UpdateProfileCommandValidator : AbstractValidator<UpdateProfileCommand>
{
    public UpdateProfileCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("Идентификатор пользователя обязателен");
            
        RuleFor(x => x.DisplayName)
            .NotEmpty().WithMessage("Имя пользователя обязательно")
            .MaximumLength(100).WithMessage("Имя пользователя не должно превышать 100 символов");
    }
}