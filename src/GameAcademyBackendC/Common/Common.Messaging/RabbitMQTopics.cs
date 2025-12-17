namespace Common.Messaging;

public static class RabbitMQTopics
{
    // Event topics
    public const string USER_CREATED = "user.created.event";
    public const string USER_UPDATED = "user.updated.event";
    public const string USER_DELETED = "user.deleted.event";
        
    // Command topics
    public const string AUTH_COMMAND_REGISTER = "auth.command.register";
    public const string AUTH_COMMAND_LOGIN = "auth.command.login";
    public const string AUTH_COMMAND_UPDATE_PROFILE = "auth.command.update-profile";
    public const string AUTH_COMMAND_CHANGE_PASSWORD = "auth.command.change-password";
    public const string AUTH_COMMAND_CHANGE_ROLE = "auth.command.change-role";
    public const string AUTH_COMMAND_DELETE_USER = "auth.command.delete-user";
        
    // Query topics
    public const string AUTH_QUERY_GET_PROFILE = "auth.query.get-profile";
    public const string AUTH_QUERY_SEARCH_USERS = "auth.query.search-users";
    public const string AUTH_QUERY_GET_ALL_USERS = "auth.query.get-all-users";
}