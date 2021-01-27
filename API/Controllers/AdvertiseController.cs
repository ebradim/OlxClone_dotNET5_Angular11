using API.AuthPolicy;
using Application.Models;
using Application.RequestsHandler.AdvertiseFavorites;
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
        public async Task<ActionResult<List<LoadHomeAdvertiseDTO>>> GetHomeAdsAsync()
        {
            return await mediator.Send(new Load.Query());
        }

        //IEnumerable<GroupedAdvertisesResult>
        [Route("search/{term}"), HttpGet, AllowAnonymous, IgnoreAntiforgeryToken]
        public async Task<IEnumerable<GroupedAdvertisesResult>> GetSearchAsync(string term)
        {
            return await mediator.Send(new SearchAdvertises.Query { Term=term});
        }

        [Route("add"), HttpPost,Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme), IgnoreAntiforgeryToken]
        public async Task<ActionResult<UserAdvertiseDTO>> CreateNewAsync([FromForm]Create.Command createAdd)
        {
            return await mediator.Send(createAdd);
        }
        [HttpGet("{id}"), AllowAnonymous, IgnoreAntiforgeryToken]
        public async Task<ActionResult<UserAdvertiseDTO>> GetAdAsync(string id)
        {
            return await mediator.Send(new Details.Query { Id = id});
        }
        
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy =AppPolicy.IS_ADVERTISE_OWNER)]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<bool>> DeleteAdAsync(string id)
        {
            return await mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPut("{id}"), Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = AppPolicy.IS_ADVERTISE_OWNER), ValidateAntiForgeryToken]
        public async Task<ActionResult<UserAdvertiseDTO>> UpdateAdAsync(string id,[FromForm]Edit.Command editAD)
        {
            editAD.UniqueId = id;
            return await mediator.Send(editAD);
        }

        [HttpPost("fav/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy=AppPolicy.IS_ADVERTISE_IN_FAVORITE)]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<bool>> AddToFavorite(string id)
        {
            return await mediator.Send(new Add.Command { AdvertiseId = id });
        }

        [HttpDelete("fav/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy=AppPolicy.IS_ADVERTISE_NOT_IN_FAVORITE)]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<bool>> RemoveFromFavorite(string id)
        {
            return await mediator.Send(new Remove.Command { AdvertiseId = id });
        }


        [HttpGet("fav")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<List<FavoriteAdvertiseDTO>>> GetFavorite()
        {
            return await mediator.Send(new LoadFavorites.Query());
        }
        [HttpPost("like/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = AppPolicy.IS_ADVERTISE_IN_USERLIKES)]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<bool>> AddToLikes(string id)
        {
            return await mediator.Send(new Like.Command { AdvertiseId = id });
        }
        [HttpGet("filter")]
        [AllowAnonymous]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult<FilteredSearchDTO>> Filter([FromQuery] Search.Query query)
        {
            return await mediator.Send(new Search.Query { AdvertiseId = query.AdvertiseId, Category = query.Category });
        }


    }
}
