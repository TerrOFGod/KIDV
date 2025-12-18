using System.Threading;
using System.Threading.Tasks;
using Account.Domain.Interfaces.User;
using FluentValidation;
using MediatR;
using Serilog;

namespace Account.Application.Features.Users.Commands.Delete;

public class DeleteUserСommandHandler : IRequestHandler<DeleteUserCommand>
{
    private readonly IValidator<DeleteUserCommand> _validator;
    private readonly IUserRepository _userRepository;
    private readonly ILogger _logger;

    public DeleteUserСommandHandler(
        ILogger logger,
        IUserRepository userRepository,
        IValidator<DeleteUserCommand> validator)
    {
        _logger = logger;
        _userRepository = userRepository;
        _validator = validator;
    }

    public async Task Handle(DeleteUserCommand command,
        CancellationToken cancellationToken)
    {
        var validation = await _validator.ValidateAsync(command, cancellationToken);

        if (!validation.IsValid)
        {
            _logger.Error("Delete User Command produced errors on validation {Errors}",
                validation.ToString());
        }

        var user = await _userRepository.GetById(command.Id);
        if (user == null)
        {
            _logger.Error("Such user does not exist");
        }

        await _userRepository.Delete(command.Id);
    }
}

