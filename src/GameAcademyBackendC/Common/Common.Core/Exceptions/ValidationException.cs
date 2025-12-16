namespace Common.Core.Exceptions;

public class ValidationException : AppException
{
    public Dictionary<string, string[]> Errors { get; }

    public ValidationException(Dictionary<string, string[]> errors)
        : base("Ошибка валидации", "VALIDATION_ERROR")
    {
        Errors = errors;
        StatusCode = 400;
    }
}
