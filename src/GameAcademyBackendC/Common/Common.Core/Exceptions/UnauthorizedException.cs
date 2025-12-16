namespace Common.Core.Exceptions;

public class UnauthorizedException : AppException
{
    public UnauthorizedException(string message = "Неавторизованный доступ")
        : base(message, "UNAUTHORIZED")
    {
        StatusCode = 401;
    }
}
