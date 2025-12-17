using System.Security.Claims;
using Common.Core.Types;

namespace Common.Core.Abstractions.Interfaces.Services;

public interface ITokenService
{
    string GenerateToken(string userId, string email, UserRole role);
    ClaimsPrincipal ValidateToken(string token);
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}