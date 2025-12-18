using Account.Application.Models;
using Account.Domain.Models.Results;
using MediatR;

namespace Account.Application.Commands.Readiness
{
    public class PerformReadinessCheckCommand : IRequest<CommandResult<string>>
    {
    }
}