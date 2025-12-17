using AuthService.Queries.Queries;
using Common.Core.Abstractions.Interfaces.CQRS;
using Common.Core.Abstractions.Interfaces.Repositories;
using Common.Core.DTOs.User;
using Common.Core.Entities.Results;
using Common.Core.Models.User;
using Microsoft.Extensions.Logging;

namespace AuthService.Queries.QueryHandlers;

public class SearchUsersQueryHandler : IQueryHandler<SearchUsersQuery, UserListDto>
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<SearchUsersQueryHandler> _logger;

        public SearchUsersQueryHandler(
            IUserRepository userRepository,
            ILogger<SearchUsersQueryHandler> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<QueryResult<UserListDto>> Handle(
            SearchUsersQuery request, CancellationToken cancellationToken)
        {
            var startTime = DateTime.UtcNow;

            try
            {
                var users = await _userRepository.SearchByDisplayNameAsync(
                    request.Query, cancellationToken);

                var totalCount = users.Count;
                var pagedUsers = users
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .ToList();

                var executionTime = (DateTime.UtcNow - startTime).TotalMilliseconds;

                return QueryResult<UserListDto>.Ok(
                    new UserListDto
                    {
                        Users = pagedUsers.Select(u => new UserProfile
                        {
                            Id = u.Id,
                            Email = u.Email,
                            DisplayName = u.DisplayName,
                            Role = u.Role,
                            CreatedAt = u.CreatedAt
                        }).ToList(),
                        TotalCount = totalCount,
                        Page = request.Page,
                        PageSize = request.PageSize
                    },
                    request.QueryId,
                    (long)executionTime);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при поиске пользователей по запросу: {Query}", request.Query);
                return QueryResult<UserListDto>.Fail(
                    ex.Message,
                    "SEARCH_USERS_ERROR",
                    request.QueryId,
                    0);
            }
        }
    }