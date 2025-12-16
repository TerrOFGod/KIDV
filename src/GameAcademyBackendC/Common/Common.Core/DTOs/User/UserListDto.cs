using Common.Core.Models.User;

namespace Common.Core.DTOs.User;

public class UserListDto
{
    public List<UserProfile> Users { get; set; }
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}
