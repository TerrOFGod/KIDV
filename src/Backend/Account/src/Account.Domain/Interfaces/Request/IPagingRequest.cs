using Microsoft.AspNetCore.Mvc;

namespace Account.Domain.Interfaces.Request;

public interface IPagingRequest
{
    /// <summary>
    ///     Размер страницы
    /// </summary>
    [FromQuery]
    public int PageSize { get; set; }

    /// <summary>
    ///     Номер страницы
    /// </summary>
    [FromQuery]
    public int PageIndex { get; set; }
}
