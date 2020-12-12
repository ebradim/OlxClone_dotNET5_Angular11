using Application.CQRS;
using Application.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IMediator mediator;
        public HomeController(IMediator mediator)
        {
            this.mediator = mediator;

        }
        [HttpGet]
        public async Task<ActionResult<List<ReadUsersDTO>>> Get()
        {
            return await mediator.Send(new ReadUsers.Query());
        }
    }
}