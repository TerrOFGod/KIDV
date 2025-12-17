using System.ComponentModel.DataAnnotations;
using Common.CQRS.Base;
using FluentValidation;

namespace AuthService.Commands.Commands;

public class DeleteUserCommand : BaseCommand<bool>
{
    [Required]
    [EmailAddress]
    public string Email { get; }

    public DeleteUserCommand(string email)
    {
        Email = email;
    }
}

public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
{
    public DeleteUserCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email обязателен")
            .EmailAddress().WithMessage("Некорректный формат email");
    }
}