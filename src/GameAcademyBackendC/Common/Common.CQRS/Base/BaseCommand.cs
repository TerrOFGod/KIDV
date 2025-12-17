using Common.Core.Entities.Results;
using MediatR;

namespace Common.CQRS.Base;

public class BaseCommand : IRequest<CommandResult>
{
    public string CommandId { get; } = Guid.NewGuid().ToString();
    public DateTime Timestamp { get; } = DateTime.UtcNow;
    public string UserId { get; set; }
    public string CorrelationId { get; set; } = Guid.NewGuid().ToString();

    protected BaseCommand(string userId = null)
    {
        UserId = userId;
    }
}

public abstract class BaseCommand<TResponse> : IRequest<CommandResult<TResponse>>
{
    public string CommandId { get; } = Guid.NewGuid().ToString();
    public DateTime Timestamp { get; } = DateTime.UtcNow;
    public string UserId { get; set; }
    public string CorrelationId { get; set; } = Guid.NewGuid().ToString();

    protected BaseCommand(string userId = null)
    {
        UserId = userId;
    }
}