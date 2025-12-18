using FluentValidation;

namespace Account.Application.Features.Users.Commands.Update;

public class UpdateUserCommandValidator: AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator()
    {
        RuleFor(c => c.DisplayName).NotEmpty();
        RuleFor(c => c.PasswordHash).NotEmpty();
        RuleFor(c => c.Email).EmailAddress();
    }
}
