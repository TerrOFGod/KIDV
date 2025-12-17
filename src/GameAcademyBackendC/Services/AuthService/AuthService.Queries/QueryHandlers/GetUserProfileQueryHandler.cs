using AuthService.Queries.Queries;
using Common.Core.Abstractions.Interfaces.CQRS;
using Common.Core.Abstractions.Interfaces.Repositories;
using Common.Core.Constants;
using Common.Core.Entities.Results;
using Common.Core.Models.User;
using Microsoft.Extensions.Logging;

namespace AuthService.Queries.QueryHandlers;

public class GetUserProfileQueryHandler : IQueryHandler<GetUserProfileQuery, UserProfile>
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<GetUserProfileQueryHandler> _logger;

    public GetUserProfileQueryHandler(
        IUserRepository userRepository,
        ILogger<GetUserProfileQueryHandler> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task<QueryResult<UserProfile>> Handle(
        GetUserProfileQuery request, CancellationToken cancellationToken)
    {
        var startTime = DateTime.UtcNow;

        try
        {
            var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken);
            if (user == null)
            {
                return QueryResult<UserProfile>.Fail(
                    AccountConstants.THIS_USER_IS_NOT_EXISTS,
                    "USER_NOT_FOUND",
                    request.QueryId,
                    0);
            }

            var executionTime = (DateTime.UtcNow - startTime).TotalMilliseconds;

            return QueryResult<UserProfile>.Ok(
                new UserProfile
                {
                    Id = user.Id,
                    Email = user.Email,
                    DisplayName = user.DisplayName,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                },
                request.QueryId,
                (long)executionTime);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении профиля пользователя {UserId}", request.UserId);
            return QueryResult<UserProfile>.Fail(
                ex.Message,
                "GET_PROFILE_ERROR",
                request.QueryId,
                0);
        }
    }
}