using Models.User;

namespace AuthService.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<User> GetUserByIdAsync(string id);
    Task<List<User>> SearchUsersAsync(string query);
}
