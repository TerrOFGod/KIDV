using System.ComponentModel.DataAnnotations;
using Common.Core.Models.User;
using Common.CQRS.Base;
using FluentValidation;

namespace AuthService.Queries.Queries;

public class GetUserProfileQuery : BaseQuery<UserProfile>
{
    [Required]
    public string UserId { get; }

    public GetUserProfileQuery(string userId)
    {
        UserId = userId;
    }
}

public class GetUserProfileQueryValidator : AbstractValidator<GetUserProfileQuery>
{
    public GetUserProfileQueryValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("Идентификатор пользователя обязателен");
    }
}