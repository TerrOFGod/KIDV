using Common.CQRS.Behaviors;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Common.CQRS.Extensions;

public static class CQRSExtensions
{
    public static IServiceCollection AddCQRS(this IServiceCollection services, 
        params Type[] assemblyMarkers)
    {
        if (assemblyMarkers?.Any() != true)
            throw new ArgumentException("At least one assembly marker type is required");

        var assemblies = assemblyMarkers.Select(t => t.Assembly).ToArray();

        services.AddMediatR(cfg => 
        {
            cfg.RegisterServicesFromAssemblies(assemblies);
        });

        // Регистрируем валидаторы
        services.AddValidatorsFromAssemblies(assemblies);

        // Регистрируем behaviors
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        return services;
    }
}