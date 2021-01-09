using API.AuthPolicy;
using Application.Models;
using Application.RequestsHandler.AdvertiseFavorites;
using Application.RequestsHandler.UserAdvertises;
using Domain;
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
        public async Task<ActionResult<List<LoadHomeAdvertiseDTO>>> GetHomeAdsAsync()
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



        [HttpPost("fav/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy=AppPolicy.IS_ADVERTISE_IN_FAVORITE)]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<bool>> AddToFavorite(string id)
        {
            return await mediator.Send(new UserAdFavAdd.AdFavAdd { AdvertiseId = id });
        }

        [HttpDelete("fav/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy=AppPolicy.IS_ADVERTISE_NOT_IN_FAVORITE)]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<bool>> RemoveFromFavorite(string id)
        {
            return await mediator.Send(new UserAdFavRemove.AdFavRemove { AdvertiseId = id });
        }


        [HttpGet("fav")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<List<FavoriteAdvertiseDTO>>> GetFavorite()
        {
            return await mediator.Send(new LoadFavorites.LoadAdsUserFavorites());
        }
    }
}
