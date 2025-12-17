using Common.Core.Abstractions;

namespace Common.Core.Entities.Results;

public class CommandResult : Result
{
    public string CommandId { get; }
    public string CorrelationId { get; }

    public CommandResult(bool success, string error, string errorCode, string commandId, string correlationId)
        : base(success, error, errorCode)
    {
        CommandId = commandId;
        CorrelationId = correlationId;
    }
}

public class CommandResult<T> : Result<T>
{
    public string CommandId { get; }
    public string CorrelationId { get; }

    public CommandResult(T value, bool success, string error, string errorCode, string commandId, string correlationId)
        : base(success, error, errorCode)
    {
        Value = value;
        CommandId = commandId;
        CorrelationId = correlationId;
    }
}