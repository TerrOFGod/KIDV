using System.ComponentModel;
using Account.Domain.Interfaces.Request;
using Account.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Account.Application.Features.Users.Queries.GetList;

public class GetUserListQuery : IRequest<DataWithTotal<User>>, IPagingRequest
{
    /// <summary>
    ///     Размер страницы
    /// </summary>
    [DefaultValue(10)]
    [FromQuery]
    public int PageSize { get; set; } = 10;

    /// <summary>
    ///     Индекс страницы
    /// </summary>
    [DefaultValue(0)]
    [FromQuery]
    public int PageIndex { get; set; } = 0;
}
