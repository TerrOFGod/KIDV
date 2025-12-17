using System.ComponentModel.DataAnnotations;
using Common.Core.Models.User;
using Common.Core.Types;
using Common.CQRS.Base;
using FluentValidation;

namespace AuthService.Commands.Commands;

public class ChangeUserRoleCommand : BaseCommand<UserProfile>
{
    [Required]
    [EmailAddress]
    public string Email { get; }
        
    [Required]
    public UserRole NewRole { get; }

    public ChangeUserRoleCommand(string email, UserRole newRole)
    {
        Email = email;
        NewRole = newRole;
    }
}

public class ChangeUserRoleCommandValidator : AbstractValidator<ChangeUserRoleCommand>
{
    public ChangeUserRoleCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email обязателен")
            .EmailAddress().WithMessage("Некорректный формат email");
            
        RuleFor(x => x.NewRole)
            .IsInEnum().WithMessage("Некорректная роль пользователя");
    }
}