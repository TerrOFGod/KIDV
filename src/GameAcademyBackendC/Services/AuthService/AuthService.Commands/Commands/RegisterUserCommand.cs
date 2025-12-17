using System.ComponentModel.DataAnnotations;
using Common.Core.DTOs.User;
using Common.CQRS.Base;
using FluentValidation;

namespace AuthService.Commands.Commands;

public class RegisterUserCommand: BaseCommand<AccountRegisterResponse>
{
    [Required]
    [EmailAddress]
    public string Email { get; }
        
    [Required]
    [MinLength(6)]
    public string Password { get; }
        
    public string DisplayName { get; }

    public RegisterUserCommand(string email, string password, string displayName = null)
    {
        Email = email;
        Password = password;
        DisplayName = displayName;
    }
}

public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email обязателен")
            .EmailAddress().WithMessage("Некорректный формат email");
            
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Пароль обязателен")
            .MinimumLength(6).WithMessage("Пароль должен содержать минимум 6 символов");
    }
}