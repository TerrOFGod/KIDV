using System.Threading;
using System.Threading.Tasks;
using Account.Application.Features.Users.Commands.Add;
using Account.Application.Features.Users.Commands.Delete;
using Account.Application.Features.Users.Commands.Update;
using Account.Application.Features.Users.Queries.GetById;
using Account.Application.Features.Users.Queries.GetList;
using Account.Domain.Models;
using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace Account.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger _logger;
        private readonly IMediator _mediator;

        public UserController(
            ILogger logger,
            IMediator mediator
        )
        {
            _logger = logger;
            _mediator = mediator;
        }

        /// <summary>
        /// Get an User by it's ID
        /// </summary>
        /// <remarks>
        /// Retrieves an User by the ID specified
        /// </remarks>
        /// <param name="id">ID of the User</param>
        [HttpGet]
        [ApiVersion("1")]
        [ApiExplorerSettings(GroupName = "v1")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Route("{id}")]
        public async Task<ActionResult<User>> GetById([FromRoute] GetUserByIdQuery id)
            => Ok(await _mediator.Send(id));

        /// <summary>
        ///     Get a paged list of Users
        /// </summary>
        /// <param name="request"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpGet]
        [ApiVersion("1")]
        [ApiExplorerSettings(GroupName = "v1")]
        [ProducesResponseType(typeof(DataWithTotal<User>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        [Route("")]
        public async Task<ActionResult<DataWithTotal<User>>> Get([FromQuery] GetUserListQuery request,
            CancellationToken token) =>
            Ok(await _mediator.Send(request, token));

        /// <summary>
        ///     Creating a new user
        /// </summary>
        /// <param name="request"></param>
        /// <param name="apiVersion"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        [Route("")]
        public async Task<IActionResult> Post([FromBody] AddUserCommand request, ApiVersion apiVersion,
            CancellationToken token)
        {
            var entity = await _mediator.Send(request, token);
            return CreatedAtAction(nameof(Get), new {id = entity.Id, version = apiVersion.ToString()}, entity);
        }

        /// <summary>
        ///     Updating curtain user
        /// </summary>
        /// <param name="client"></param>
        /// <param name="apiVersion"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateUserCommand client, ApiVersion apiVersion,
            CancellationToken token)
        {
            var result = await _mediator.Send(client, token);
            return result ? (IActionResult)Ok() : BadRequest();
        }

        /// <summary>
        ///     Delete user by id
        /// </summary>
        /// <param name="client"></param>
        /// <param name="apiVersion"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpDelete]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromBody] DeleteUserCommand client, ApiVersion apiVersion,
            CancellationToken token)
        {
            await _mediator.Send(client, token);
            return Ok();
        }
    }
}
