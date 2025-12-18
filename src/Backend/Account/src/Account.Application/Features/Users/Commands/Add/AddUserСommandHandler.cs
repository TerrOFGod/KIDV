using System.Threading;
using System.Threading.Tasks;
using Account.Domain.Interfaces.User;
using FluentValidation;
using MediatR;
using Serilog;

namespace Account.Application.Features.Users.Commands.Add;

public class AddUserСommandHandler : IRequestHandler<AddUserCommand, Domain.Models.User>
{
    private readonly IValidator<AddUserCommand> _validator;
    private readonly IUserRepository _userRepository;
    private readonly ILogger _logger;

    public AddUserСommandHandler(
        ILogger logger,
        IUserRepository userRepository,
        IValidator<AddUserCommand> validator)
    {
        _logger = logger;
        _userRepository = userRepository;
        _validator = validator;
    }

    public async Task<Domain.Models.User> Handle(AddUserCommand command,
        CancellationToken cancellationToken)
    {
        var validation = await _validator.ValidateAsync(command, cancellationToken);

        if (!validation.IsValid)
        {
            _logger.Error("Add User Command produced errors on validation {Errors}",
                validation.ToString());
        }

        Domain.Models.User user = new()
        {
            DisplayName = command.DisplayName,
            Email = command.Email,
            PasswordHash = command.PasswordHash,
            Role = command.Role
        };

        await _userRepository.Add(user);


        return user;
    }
}

