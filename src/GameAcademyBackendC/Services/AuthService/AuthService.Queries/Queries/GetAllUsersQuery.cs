using Common.Core.DTOs.User;
using Common.CQRS.Base;

namespace AuthService.Queries.Queries;

public class GetAllUsersQuery : BaseQuery<UserListDto>
{
    public int Page { get; }
    public int PageSize { get; }

    public GetAllUsersQuery(int page = 1, int pageSize = 20)
    {
        Page = page;
        PageSize = pageSize;
    }
}