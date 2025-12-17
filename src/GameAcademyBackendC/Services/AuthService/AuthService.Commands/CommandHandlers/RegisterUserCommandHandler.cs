using AuthService.Commands.Commands;
using Common.Auth.Extensions;
using Common.Core.Abstractions.Interfaces.CQRS;
using Common.Core.Abstractions.Interfaces.Repositories;
using Common.Core.Abstractions.Interfaces.Services;
using Common.Core.Constants;
using Common.Core.DTOs.User;
using Common.Core.Entities.Results;
using Common.Core.Models.User;
using Common.Core.Types;
using Common.Messaging;
using Common.Messaging.Events.User;
using Microsoft.Extensions.Logging;

namespace AuthService.Commands.CommandHandlers;

public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand, AccountRegisterResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IRabbitMQService _rabbitMQ;
        private readonly ILogger<RegisterUserCommandHandler> _logger;

        public RegisterUserCommandHandler(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher,
            IRabbitMQService rabbitMQ,
            ILogger<RegisterUserCommandHandler> logger)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _rabbitMQ = rabbitMQ;
            _logger = logger;
        }

        public async Task<CommandResult<AccountRegisterResponse>> Handle(
            RegisterUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                // Проверяем существование пользователя
                var existingUser = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);
                if (existingUser != null)
                {
                    return CommandResult<AccountRegisterResponse>.Fail(
                        AccountConstants.THIS_USER_IS_EXISTS,
                        "USER_ALREADY_EXISTS",
                        request.CommandId,
                        request.CorrelationId);
                }

                // Создаем пользователя
                var user = new User
                {
                    Email = request.Email,
                    DisplayName = request.DisplayName ?? request.Email.Split('@')[0],
                    PasswordHash = _passwordHasher.Hash(request.Password),
                    Role = UserRole.Student
                };

                var createdUser = await _userRepository.AddAsync(user, cancellationToken);

                // Публикуем событие
                _rabbitMQ.Publish(new UserCreatedEvent
                {
                    UserId = createdUser.Id,
                    Email = createdUser.Email,
                    DisplayName = createdUser.DisplayName,
                    Role = createdUser.Role
                }, RabbitMQTopics.USER_CREATED);

                _logger.LogInformation(
                    "Пользователь {Email} успешно зарегистрирован (ID: {UserId})",
                    createdUser.Email, createdUser.Id);

                return CommandResult<AccountRegisterResponse>.Ok(
                    new AccountRegisterResponse { Email = createdUser.Email },
                    request.CommandId,
                    request.CorrelationId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при регистрации пользователя {Email}", request.Email);
                return CommandResult<AccountRegisterResponse>.Fail(
                    ex.Message,
                    "REGISTRATION_ERROR",
                    request.CommandId,
                    request.CorrelationId);
            }
        }
    }