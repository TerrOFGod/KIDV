using Common.Core.Entities.Results;
using MediatR;

namespace Common.CQRS.Base;

public class BaseQuery<TResponse> : IRequest<QueryResult<TResponse>>
{
    public string QueryId { get; } = Guid.NewGuid().ToString();
    public DateTime Timestamp { get; } = DateTime.UtcNow;
    public string CorrelationId { get; set; } = Guid.NewGuid().ToString();
}