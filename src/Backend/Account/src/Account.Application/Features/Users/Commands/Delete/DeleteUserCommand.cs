using MediatR;

namespace Account.Application.Features.Users.Commands.Delete;

public class DeleteUserCommand : IRequest
{
    public string Id { get; }
}
