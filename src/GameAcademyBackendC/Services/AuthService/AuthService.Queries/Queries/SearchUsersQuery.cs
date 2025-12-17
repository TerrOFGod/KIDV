using Common.Core.DTOs.User;
using Common.CQRS.Base;

namespace AuthService.Queries.Queries;

public class SearchUsersQuery : BaseQuery<UserListDto>
{
    public string Query { get; }
    public int Page { get; }
    public int PageSize { get; }

    public SearchUsersQuery(string query = null, int page = 1, int pageSize = 20)
    {
        Query = query;
        Page = page;
        PageSize = pageSize;
    }
}