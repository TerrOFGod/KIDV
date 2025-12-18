using MediatR;

namespace Account.Application.Features.Users.Queries.GetById;

public class GetUserByIdQuery : IRequest<Domain.Models.User>
{
    public string Id { get; set; }
}
