using System.Threading;
using System.Threading.Tasks;
using Account.Domain.Interfaces.User;
using FluentValidation;
using MediatR;
using Serilog;

namespace Account.Application.Features.Users.Queries.GetById;

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Domain.Models.User>
{
    private readonly IValidator<GetUserByIdQuery> _validator;
    private readonly IUserRepository _userRepository;
    private readonly ILogger _logger;

    public GetUserByIdQueryHandler(
        ILogger logger,
        IUserRepository userRepository,
        IValidator<GetUserByIdQuery> validator)
    {
        _logger = logger;
        _userRepository = userRepository;
        _validator = validator;
    }

    public async Task<Domain.Models.User> Handle(GetUserByIdQuery request,
        CancellationToken cancellationToken)
    {
        var validation = _validator.Validate(request);

        if (!validation.IsValid)
        {
            _logger.Error("Get example by id with id {Id} produced errors on validation {Errors}", request.Id,
                validation.ToString());
        }

        var user = await _userRepository.GetById(request.Id);

        if (user == null)
        {
            _logger.Error("User {0} not found", request.Id);
        }

        return user;
    }
}
