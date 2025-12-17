namespace AuthService.API.DTOs;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T Data { get; set; }
    public string Error { get; set; }
    public string ErrorCode { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public static ApiResponse<T> Ok(T data) => new() { Success = true, Data = data };
    public static ApiResponse<T> Fail(string error, string errorCode = null) => new() 
    { 
        Success = false, 
        Error = error, 
        ErrorCode = errorCode 
    };
}

public static class ApiResponse
{
    public static ApiResponse<object> Ok() => ApiResponse<object>.Ok(null);
    public static ApiResponse<T> Ok<T>(T data) => ApiResponse<T>.Ok(data);
    public static ApiResponse<object> Fail(string error, string errorCode = null) => 
        ApiResponse<object>.Fail(error, errorCode);
}