using System.Threading;
using System.Threading.Tasks;
using Account.Domain.Interfaces.User;
using FluentValidation;
using MediatR;
using Serilog;

namespace Account.Application.Features.Users.Commands.Update;

public class UpdateUserСommandHandler : IRequestHandler<UpdateUserCommand, bool>
{
    private readonly IValidator<UpdateUserCommand> _validator;
    private readonly IUserRepository _userRepository;
    private readonly ILogger _logger;

    public UpdateUserСommandHandler(
        ILogger logger,
        IUserRepository userRepository,
        IValidator<UpdateUserCommand> validator)
    {
        _logger = logger;
        _userRepository = userRepository;
        _validator = validator;
    }

    public async Task<bool> Handle(UpdateUserCommand command,
        CancellationToken cancellationToken)
    {
        var validation = await _validator.ValidateAsync(command, cancellationToken);

        if (!validation.IsValid)
        {
            _logger.Error("Update User Command produced errors on validation {Errors}",
                validation.ToString());
        }

        Domain.Models.User user = new()
        {
            DisplayName = command.DisplayName,
            Email = command.Email,
            PasswordHash = command.PasswordHash,
            Role = command.Role
        };

        var result = await _userRepository.Update(user);

        if (result)
        {
            _logger.Information("User updated");
        }
        else
        {
            _logger.Error("Update User Command produced errors on update");
        }


        return result;
    }
}

