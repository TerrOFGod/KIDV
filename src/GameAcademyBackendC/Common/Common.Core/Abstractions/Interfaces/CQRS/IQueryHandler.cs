using Common.Core.Entities.Results;
using MediatR;

namespace Common.Core.Abstractions.Interfaces.CQRS;

public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, QueryResult<TResponse>>
    where TQuery : IQuery<TResponse>
{
}