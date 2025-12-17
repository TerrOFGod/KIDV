using AuthService.Commands.Commands;
using Common.Auth.Extensions;
using Common.Core.Abstractions.Interfaces.CQRS;
using Common.Core.Abstractions.Interfaces.Repositories;
using Common.Core.Abstractions.Interfaces.Services;
using Common.Core.Constants;
using Common.Core.DTOs.User;
using Common.Core.Entities.Results;
using Common.Core.Models.User;
using Microsoft.Extensions.Logging;

namespace AuthService.Commands.CommandHandlers;

public class LoginUserCommandHandler : ICommandHandler<LoginUserCommand, AccountLoginResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenService _tokenService;
        private readonly ILogger<LoginUserCommandHandler> _logger;

        public LoginUserCommandHandler(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher,
            ITokenService tokenService,
            ILogger<LoginUserCommandHandler> logger)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<CommandResult<AccountLoginResponse>> Handle(
            LoginUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);
                if (user == null)
                {
                    return CommandResult<AccountLoginResponse>.Fail(
                        AccountConstants.WRONG_LOGIN_OR_PASSWORD,
                        "INVALID_CREDENTIALS",
                        request.CommandId,
                        request.CorrelationId);
                }

                if (!_passwordHasher.Verify(request.Password, user.PasswordHash))
                {
                    return CommandResult<AccountLoginResponse>.Fail(
                        AccountConstants.WRONG_LOGIN_OR_PASSWORD,
                        "INVALID_CREDENTIALS",
                        request.CommandId,
                        request.CorrelationId);
                }

                var token = _tokenService.GenerateToken(user.Id, user.Email, user.Role);

                _logger.LogInformation("Пользователь {Email} успешно вошел в систему", user.Email);

                return CommandResult<AccountLoginResponse>.Ok(
                    new AccountLoginResponse
                    {
                        AccessToken = token,
                        User = new UserProfile
                        {
                            Id = user.Id,
                            Email = user.Email,
                            DisplayName = user.DisplayName,
                            Role = user.Role
                        }
                    },
                    request.CommandId,
                    request.CorrelationId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при входе пользователя {Email}", request.Email);
                return CommandResult<AccountLoginResponse>.Fail(
                    ex.Message,
                    "LOGIN_ERROR",
                    request.CommandId,
                    request.CorrelationId);
            }
        }
    }
}