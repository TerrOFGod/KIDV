using FluentValidation;

namespace Account.Application.Features.Users.Queries.GetList;

public class GetUserListQueryValidator : AbstractValidator<GetUserListQuery>
{
    public GetUserListQueryValidator()
    {
        RuleFor(q => q.PageSize).GreaterThan(0);
        RuleFor(q => q.PageIndex).GreaterThanOrEqualTo(0);
    }
}
