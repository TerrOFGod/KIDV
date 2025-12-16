namespace Common.Core.Exceptions;

public class AppException : Exception
{
    public string Code { get; }
    public int StatusCode { get; set; } = 400;

    public AppException(string message, string code = null) : base(message)
    {
        Code = code;
    }
}
