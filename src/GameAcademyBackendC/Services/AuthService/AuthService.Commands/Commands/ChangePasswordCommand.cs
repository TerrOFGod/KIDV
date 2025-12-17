using System.ComponentModel.DataAnnotations;
using Common.CQRS.Base;
using FluentValidation;

namespace AuthService.Commands.Commands;

public class ChangePasswordCommand : BaseCommand<bool>
{
    [Required]
    public string UserId { get; set; }

    [Required]
    [MinLength(6)]
    public string OldPassword { get; }
        
    [Required]
    [MinLength(6)]
    public string NewPassword { get; }

    public ChangePasswordCommand(string userId, string oldPassword, string newPassword)
    {
        UserId = userId;
        OldPassword = oldPassword;
        NewPassword = newPassword;
    }
}

public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("Идентификатор пользователя обязателен");
            
        RuleFor(x => x.OldPassword)
            .NotEmpty().WithMessage("Старый пароль обязателен")
            .MinimumLength(6).WithMessage("Старый пароль должен содержать минимум 6 символов");
            
        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage("Новый пароль обязателен")
            .MinimumLength(6).WithMessage("Новый пароль должен содержать минимум 6 символов")
            .NotEqual(x => x.OldPassword).WithMessage("Новый пароль должен отличаться от старого");
    }
}