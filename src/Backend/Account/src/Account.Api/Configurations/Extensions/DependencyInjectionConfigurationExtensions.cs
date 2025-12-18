using Lamar;
using MediatR;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Account.Application.Models;

namespace Account.Api.Configurations.Extensions
{
    public static class DependencyInjectionConfigurationExtensions
    {
        internal static void AddDependencyInjection(this ServiceRegistry services, IConfiguration configuration)
        {
            // Map the environment variables to an object that represents them
            ((IServiceCollection)services).Configure<EnvironmentConfiguration>(configuration);

            // https://jasperfx.github.io/lamar/documentation/ioc/registration/auto-registration-and-conventions/
            services.Scan(_ =>
            {
                _.TheCallingAssembly();
                _.Assembly("Account.Application");
                _.Assembly("Account.Infrastructure");
                _.AddAllTypesOf<IValidator>();
                _.ConnectImplementationsToTypesClosing(typeof(IValidator<>));
                _.ConnectImplementationsToTypesClosing(typeof(IRequestHandler<,>));
                _.ConnectImplementationsToTypesClosing(typeof(INotificationHandler<>));
                _.WithDefaultConventions();
                _.LookForRegistries();
            });
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(Startup).Assembly));
        }
    }
}
