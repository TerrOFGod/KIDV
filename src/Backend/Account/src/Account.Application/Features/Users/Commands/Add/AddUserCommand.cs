using MediatR;

namespace Account.Application.Features.Users.Commands.Add;

public class AddUserCommand : IRequest<Domain.Models.User>
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }
}
