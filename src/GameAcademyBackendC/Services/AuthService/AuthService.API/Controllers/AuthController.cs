using System.Security.Claims;
using AuthService.API.DTOs;
using AuthService.Commands.Commands;
using AuthService.Queries.Queries;
using Common.Core.Abstractions.Interfaces.Services;
using Common.Core.DTOs.User;
using Common.Core.Entities.Results;
using Common.Core.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController  : ControllerBase
{
    private readonly IRabbitMQService _rabbitMQ;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IRabbitMQService rabbitMQ,
        ILogger<AuthController> logger)
    {
        _rabbitMQ = rabbitMQ;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var command = new RegisterUserCommand(request.Email, request.Password, request.DisplayName);
                
            var response = await _rabbitMQ.RequestAsync<RegisterUserCommand, CommandResult<AccountRegisterResponse>>(
                command, 
                "auth.command.register",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return BadRequest(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in register endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var command = new LoginUserCommand(request.Email, request.Password);
                
            var response = await _rabbitMQ.RequestAsync<LoginUserCommand, CommandResult<AccountLoginResponse>>(
                command, 
                "auth.command.login",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return Unauthorized(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in login endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }

    [Authorize]
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var command = new UpdateProfileCommand(userId, request.DisplayName);
            command.UserId = userId;

            var response = await _rabbitMQ.RequestAsync<UpdateProfileCommand, CommandResult<UserProfile>>(
                command, 
                "auth.command.update-profile",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return BadRequest(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in update profile endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var command = new ChangePasswordCommand(userId, request.OldPassword, request.NewPassword);
            command.UserId = userId;

            var response = await _rabbitMQ.RequestAsync<ChangePasswordCommand, CommandResult<bool>>(
                command, 
                "auth.command.change-password",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return BadRequest(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in change password endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("change-role")]
    public async Task<IActionResult> ChangeRole([FromBody] ChangeRoleRequest request)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var command = new ChangeUserRoleCommand(request.Email, request.NewRole);
            command.UserId = userId;

            var response = await _rabbitMQ.RequestAsync<ChangeUserRoleCommand, CommandResult<UserProfile>>(
                command, 
                "auth.command.change-role",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return BadRequest(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in change role endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("user")]
    public async Task<IActionResult> DeleteUser([FromQuery] string email)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var command = new DeleteUserCommand(email);
            command.UserId = userId;

            var response = await _rabbitMQ.RequestAsync<DeleteUserCommand, CommandResult<bool>>(
                command, 
                "auth.command.delete-user",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return BadRequest(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in delete user endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var query = new GetUserProfileQuery(userId);

            var response = await _rabbitMQ.RequestAsync<GetUserProfileQuery, QueryResult<UserProfile>>(
                query, 
                "auth.query.get-profile",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return BadRequest(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in get profile endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        try
        {
            var query = new GetAllUsersQuery(page, pageSize);

            var response = await _rabbitMQ.RequestAsync<GetAllUsersQuery, QueryResult<UserListDto>>(
                query, 
                "auth.query.get-all-users",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return BadRequest(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in get all users endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("users/search")]
    public async Task<IActionResult> SearchUsers(
        [FromQuery] string query = null, 
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 20)
    {
        try
        {
            var searchQuery = new SearchUsersQuery(query, page, pageSize);

            var response = await _rabbitMQ.RequestAsync<SearchUsersQuery, QueryResult<UserListDto>>(
                searchQuery, 
                "auth.query.search-users",
                TimeSpan.FromSeconds(30));

            if (response.IsSuccess)
                return Ok(ApiResponse.Ok(response.Value));

            return BadRequest(ApiResponse.Fail(response.Error, response.ErrorCode));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in search users endpoint");
            return StatusCode(500, ApiResponse.Fail("Internal server error"));
        }
    }
}
