using Common.Core.Entities.Results;
using MediatR;

namespace Common.Core.Abstractions.Interfaces.CQRS;

public interface ICommand : IRequest<CommandResult>
{
    string CommandId { get; }
    DateTime Timestamp { get; }
    string UserId { get; }
}

public interface ICommand<TResponse> : IRequest<CommandResult<TResponse>>
{
    string CommandId { get; }
    DateTime Timestamp { get; }
    string UserId { get; }
}