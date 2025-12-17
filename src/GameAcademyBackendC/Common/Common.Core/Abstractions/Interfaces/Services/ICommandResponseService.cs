using Common.Core.Entities.Results;

namespace Common.Core.Abstractions.Interfaces.Services;

public interface ICommandResponseService
{
    Task<CommandResult<TResponse>> SendCommandAsync<TCommand, TResponse>(
        TCommand command, 
        string routingKey, 
        TimeSpan? timeout = null) 
        where TCommand : class 
        where TResponse : class;
        
    Task<QueryResult<TResponse>> SendQueryAsync<TQuery, TResponse>(
        TQuery query, 
        string routingKey, 
        TimeSpan? timeout = null) 
        where TQuery : class 
        where TResponse : class;
}