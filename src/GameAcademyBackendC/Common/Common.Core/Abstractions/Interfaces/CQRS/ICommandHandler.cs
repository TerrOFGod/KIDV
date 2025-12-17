using Common.Core.Entities.Results;
using MediatR;

namespace Common.Core.Abstractions.Interfaces.CQRS;

public interface ICommandHandler<in TCommand> : IRequestHandler<TCommand, CommandResult>
    where TCommand : ICommand
{
}

public interface ICommandHandler<in TCommand, TResponse> : IRequestHandler<TCommand, CommandResult<TResponse>>
    where TCommand : ICommand<TResponse>
{
}