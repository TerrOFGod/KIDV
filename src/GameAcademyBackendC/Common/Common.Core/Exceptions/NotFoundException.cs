namespace Common.Core.Exceptions;

public class NotFoundException : AppException
{
    public NotFoundException(string entity, string id)
    : base($"{entity} с ID '{id}' не найден", "NOT_FOUND")
    {
        StatusCode = 404;
    }
}
