using Common.Core.Abstractions;

namespace Common.Core.Entities.Results;

public class SuccessResult : Result
{
    public SuccessResult() : base(true, null, null) { }
}

public class SuccessResult<T> : Result<T>
{
    public T Value { get; }

    public SuccessResult(T value) : base(true, null, null)
    {
        Value = value;
    }
}