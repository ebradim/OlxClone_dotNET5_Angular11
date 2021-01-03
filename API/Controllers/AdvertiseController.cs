using API.AuthPolicy;
using Application.Models;
using Application.RequestsHandler.UserAdvertises;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
        [Route("load"), HttpGet,AllowAnonymous, IgnoreAntiforgeryToken]
        public async Task<ActionResult<List<UserAdvertiseDTO>>> GetHomeAdsAsync()
        {
            return await mediator.Send(new UserAdLoad.LoadAds());
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
        
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy =AppPolicy.IS_ADVERTISE_OWNER)]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<bool>> DeleteAdAsync(string id)
        {
            return await mediator.Send(new UserAdDelete.DeleteAdd { Id = id });
        }

        [HttpPut("{id}"), Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = AppPolicy.IS_ADVERTISE_OWNER), IgnoreAntiforgeryToken]
        public async Task<ActionResult<UserAdvertiseDTO>> UpdateAdAsync(string id,UserAdEdit.EditAD editAD)
        {
            editAD.UniqueId = id;
            return await mediator.Send(editAD);
        }
    }
}
