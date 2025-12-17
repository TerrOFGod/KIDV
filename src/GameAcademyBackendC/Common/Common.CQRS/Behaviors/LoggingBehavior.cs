using MediatR;
using Microsoft.Extensions.Logging;

namespace Common.CQRS.Behaviors;

public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;

    public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, 
        CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        var requestId = Guid.NewGuid().ToString();

        _logger.LogInformation("Начало обработки запроса {RequestName} [{RequestId}]", 
            requestName, requestId);

        var startTime = DateTime.UtcNow;

        try
        {
            var response = await next();

            var endTime = DateTime.UtcNow;
            var duration = (endTime - startTime).TotalMilliseconds;

            _logger.LogInformation(
                "Запрос {RequestName} [{RequestId}] успешно обработан за {Duration}ms",
                requestName, requestId, duration);

            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, 
                "Ошибка при обработке запроса {RequestName} [{RequestId}]", 
                requestName, requestId);
            throw;
        }
    }
}