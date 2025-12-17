using Common.Core.Models.User;

namespace Common.Core.DTOs.User;

public class AccountLoginResponse
{
    public string AccessToken { get; set; }
    public UserProfile User { get; set; }
}