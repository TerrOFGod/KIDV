using AuthService.Interfaces;
using Models.User;
using RabbitMQ.Client;
using Common.Models;
using AuthService.Data;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace AuthService.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    private readonly IConnection _rabbitMqConnection;

    public AuthService(
        IUserRepository userRepository,
        ITokenService tokenService,
        IConnection rabbitMqConnection)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
        _rabbitMqConnection = rabbitMqConnection;
    }

    public Task<User> GetUserByIdAsync(string id)
    {
        throw new NotImplementedException();
    }

    public Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<List<User>> SearchUsersAsync(string query)
    {
        throw new NotImplementedException();
    }
}
