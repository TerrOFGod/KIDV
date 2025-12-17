using Common.Core.Entities.Results;
using MediatR;

namespace Common.Core.Abstractions.Interfaces.CQRS;

public interface IQuery<TResponse> : IRequest<QueryResult<TResponse>>
{
    string QueryId { get; }
    DateTime Timestamp { get; }
}