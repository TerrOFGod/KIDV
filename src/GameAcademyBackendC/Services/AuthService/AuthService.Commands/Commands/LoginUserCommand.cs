using System.ComponentModel.DataAnnotations;
using Common.Core.DTOs.User;
using Common.CQRS.Base;
using FluentValidation;

namespace AuthService.Commands.Commands;

public class LoginUserCommand : BaseCommand<AccountLoginResponse>
{
    [Required]
    [EmailAddress]
    public string Email { get; }
        
    [Required]
    public string Password { get; }

    public LoginUserCommand(string email, string password)
    {
        Email = email;
        Password = password;
    }
}

public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
{
    public LoginUserCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email обязателен")
            .EmailAddress().WithMessage("Некорректный формат email");
            
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Пароль обязателен");
    }
}