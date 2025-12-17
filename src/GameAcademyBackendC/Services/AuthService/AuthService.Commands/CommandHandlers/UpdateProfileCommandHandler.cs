using AuthService.Commands.Commands;
using Common.Core.Abstractions.Interfaces.CQRS;
using Common.Core.Abstractions.Interfaces.Repositories;
using Common.Core.Abstractions.Interfaces.Services;
using Common.Core.Constants;
using Common.Core.Entities.Results;
using Common.Core.Models.User;
using Common.Messaging;
using Common.Messaging.Events.User;
using Microsoft.Extensions.Logging;

namespace AuthService.Commands.CommandHandlers;

public class UpdateProfileCommandHandler : ICommandHandler<UpdateProfileCommand, UserProfile>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRabbitMQService _rabbitMQ;
        private readonly ILogger<UpdateProfileCommandHandler> _logger;

        public UpdateProfileCommandHandler(
            IUserRepository userRepository,
            IRabbitMQService rabbitMQ,
            ILogger<UpdateProfileCommandHandler> logger)
        {
            _userRepository = userRepository;
            _rabbitMQ = rabbitMQ;
            _logger = logger;
        }

        public async Task<CommandResult<UserProfile>> Handle(
            UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken);
                if (user == null)
                {
                    return CommandResult<UserProfile>.Fail(
                        AccountConstants.THIS_USER_IS_NOT_EXISTS,
                        "USER_NOT_FOUND",
                        request.CommandId,
                        request.CorrelationId);
                }

                user.DisplayName = request.DisplayName;
                user.UpdatedAt = DateTime.UtcNow;

                var updatedUser = await _userRepository.UpdateAsync(user, cancellationToken);

                // Публикуем событие
                _rabbitMQ.Publish(new UserUpdatedEvent
                {
                    UserId = updatedUser.Id,
                    DisplayName = updatedUser.DisplayName,
                    Role = updatedUser.Role
                }, RabbitMQTopics.USER_UPDATED);

                _logger.LogInformation(
                    "Профиль пользователя {UserId} обновлен", updatedUser.Id);

                return CommandResult<UserProfile>.Ok(
                    new UserProfile
                    {
                        Id = updatedUser.Id,
                        Email = updatedUser.Email,
                        DisplayName = updatedUser.DisplayName,
                        Role = updatedUser.Role
                    },
                    request.CommandId,
                    request.CorrelationId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при обновлении профиля пользователя {UserId}", request.UserId);
                return CommandResult<UserProfile>.Fail(
                    ex.Message,
                    "UPDATE_PROFILE_ERROR",
                    request.CommandId,
                    request.CorrelationId);
            }
        }
    }