using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Account.Domain.Interfaces.User;
using Account.Domain.Models;
using FluentValidation;
using MediatR;
using Serilog;

namespace Account.Application.Features.Users.Queries.GetList;

public class GetUserListQueryHandler : IRequestHandler<GetUserListQuery, DataWithTotal<User>>
{
    private readonly IValidator<GetUserListQuery> _validator;
    private readonly IUserRepository _userRepository;
    private readonly ILogger _logger;

    public GetUserListQueryHandler(
        ILogger logger,
        IUserRepository userRepository,
        IValidator<GetUserListQuery> validator)
    {
        _logger = logger;
        _userRepository = userRepository;
        _validator = validator;
    }

    public async Task<DataWithTotal<User>> Handle(GetUserListQuery query,
        CancellationToken cancellationToken)
    {
        var validation = _validator.Validate(query);

        IEnumerable<User> users =
            await _userRepository.Get(query.PageSize, query.PageSize * query.PageIndex);
        long total = await _userRepository.Count();

        return new DataWithTotal<User>(users, (int)total);
    }
}
