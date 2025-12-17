using Common.Core.Entities.Results;

namespace Common.Core.Abstractions;

public abstract class Result
{
    public bool Success { get; protected set; }
    public string Error { get; protected set; }
    public string ErrorCode { get; protected set; }
    public DateTime Timestamp { get; } = DateTime.UtcNow;

    public bool IsFailure => !Success;
    public bool IsSuccess => Success;

    protected Result(bool success, string error, string errorCode)
    {
        Success = success;
        Error = error;
        ErrorCode = errorCode;
    }

    public static Result Ok() => new SuccessResult();
    public static Result Fail(string error, string errorCode = null) => new FailureResult(error, errorCode);
    public static Result<T> Ok<T>(T value) => new SuccessResult<T>(value);
    public static Result<T> Fail<T>(string error, string errorCode = null) => new FailureResult<T>(error, errorCode);
}

public abstract class Result<T> : Result
{
    public T Value { get; protected set; }

    protected Result(bool success, string error, string errorCode) 
        : base(success, error, errorCode)
    {
    }
}