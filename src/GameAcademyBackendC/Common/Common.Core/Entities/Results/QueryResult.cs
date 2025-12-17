using Common.Core.Abstractions;

namespace Common.Core.Entities.Results;

public class QueryResult<T> : Result<T>
{
    public string QueryId { get; }
    public long ExecutionTimeMs { get; }

    public QueryResult(T value, bool success, string error, string errorCode, string queryId, long executionTimeMs)
        : base(success, error, errorCode)
    {
        Value = value;
        QueryId = queryId;
        ExecutionTimeMs = executionTimeMs;
    }
}
