namespace Common.Core.DTOs.User;

public class UserSearchDto
{
    public string Query { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}
