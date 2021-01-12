using API.AuthPolicy.Requirements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading.Tasks;

namespace API.AuthPolicy.Handler
{
    public class IsAdvertiseInFavoritesHandler : AuthorizationHandler<IsAdvertiseInFavoritesRequirement>
    {
        private readonly IHttpContextAccessor contextAccessor;
        private readonly DataContext dataContext;

        public IsAdvertiseInFavoritesHandler(IHttpContextAccessor contextAccessor,DataContext dataContext)
        {
            this.contextAccessor = contextAccessor;
            this.dataContext = dataContext;
        }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAdvertiseInFavoritesRequirement requirement)
        {
             if(context.Resource != null)
            {
                var userId = contextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == "_cuser")?.Value;
                var advertiseId = contextAccessor.HttpContext.GetRouteValue("id").ToString();

                var userAdvertise = await dataContext.UserFavorites.Where(x => x.Advertise.UniqueId == advertiseId && x.AppUserId == userId)
                    .AsNoTracking().FirstOrDefaultAsync();

                switch (requirement.FavoriteRequirement)
                {
                    case FavoriteRequirement.Adding:
                        // user is adding the advertise to favorite list
                        // requirement check if the advertise in favorite list                           
                        if (userAdvertise is null)
                        {
                            // not in favorite list
                            context.Succeed(requirement);
                        }
                        else
                        {
                            context.Fail();
                        }
                        break;
                    case FavoriteRequirement.Removing:
                        if (userAdvertise is not null)
                        {
                            // is in favorite list
                            context.Succeed(requirement);
                        }
                        else
                        {
                            context.Fail();
                        }
                        break;
                }

            }
            else
            {
                context.Fail();
            }
        }
    }
}