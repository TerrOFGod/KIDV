using Common.Core.Abstractions;

namespace Common.Core.Entities.Results;

public class FailureResult : Result
{
    public FailureResult(string error, string errorCode) : base(false, error, errorCode) { }
}

public class FailureResult<T> : Result<T>
{
    public FailureResult(string error, string errorCode) : base(false, error, errorCode)
    {
        Value = default;
    }
}