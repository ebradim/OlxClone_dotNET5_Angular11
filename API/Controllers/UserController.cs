using Application.Models;
using Application.RequestsHandler.User;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMediator mediator;

        public UserController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        //localhost/api/user/register
        [HttpPost("register")]
        [AllowAnonymous]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<AuthUserDTO>> Register(Register.AccountRegister register)
        {
            return await mediator.Send(register);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<AuthUserDTO>> Login(Login.AccountLogin login)
        {
            return await mediator.Send(login);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("forgery")]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<Unit>> GenerateForgeryToken()
        {
            return await mediator.Send(new ForgeryToken.Generate());
        }

        [HttpGet("refresh")]
        public async Task<ActionResult<AuthUserDTO>> Refresh()
        {
            return await mediator.Send(new TokenRefresh.Refresh());
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("logout")]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<bool>> Logout()
        {
            return await mediator.Send(new Logout.AccountLogoutRequest());
        }
    }
}
