using FluentValidation;

namespace Account.Application.Features.Users.Commands.Add;

public class AddUserCommandValidator: AbstractValidator<AddUserCommand>
{
    public AddUserCommandValidator()
    {
        RuleFor(c => c.DisplayName).NotEmpty();
        RuleFor(c => c.PasswordHash).NotEmpty();
        RuleFor(c => c.Email).EmailAddress();
    }
}
