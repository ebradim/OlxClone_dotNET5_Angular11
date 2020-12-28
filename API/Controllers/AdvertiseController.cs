using Application.Models;
using Application.RequestsHandler.UserAdvertises;
using Domain;
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
    public class AdvertiseController : ControllerBase
    {
        private readonly IMediator mediator;

        public AdvertiseController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [Route("add"), HttpPost,Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme), IgnoreAntiforgeryToken]
        public async Task<ActionResult<UserAdvertiseDTO>> CreateNewAsync(UserAds.NewAdd createAdd)
        {
            return await mediator.Send(createAdd);
        }
        [HttpGet("{id}"), Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme), IgnoreAntiforgeryToken]
        public async Task<ActionResult<UserAdvertiseDetailsDTO>> GetAdAsync(string id)
        {
            return await mediator.Send(new UserAdsDetails.AdDetails { Id = id});
        }

        [HttpDelete("{id}"), Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme), IgnoreAntiforgeryToken]
        public async Task<ActionResult<bool>> DeleteAdAsync(string id)
        {
            return await mediator.Send(new UserAdDelete.DeleteAdd { Id = id });
        }

        [HttpPut("{id}"), Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme), IgnoreAntiforgeryToken]
        public async Task<ActionResult<UserAdvertiseDTO>> UpdateAdAsync(string id,UserAdEdit.EditAD editAD)
        {
            editAD.Id = id;
            return await mediator.Send(editAD);
        }
    }
}
