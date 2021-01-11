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
    public class AdvertiseOwnerHandler : AuthorizationHandler<AdvertiseOwnerRequirement>
    {
        private readonly IHttpContextAccessor contextAccessor;
        private readonly DataContext dataContext;

        public AdvertiseOwnerHandler(IHttpContextAccessor contextAccessor,DataContext dataContext)
        {
            this.contextAccessor = contextAccessor;
            this.dataContext = dataContext;
        }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AdvertiseOwnerRequirement requirement)
        {
            if(context.Resource != null)
            {
                var userId = contextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == "_cuser")?.Value;
                var advertiseId = contextAccessor.HttpContext.GetRouteValue("id").ToString();

                var userAdvertise = await dataContext.UserAdvertise.Where(x => x.Advertise.UniqueId == advertiseId && x.AppUserId == userId)
                    .AsNoTracking().FirstOrDefaultAsync();

                if(userAdvertise is not null)
                {
                    context.Succeed(requirement);
                }
                else
                {
                    context.Fail();
                }
            }
            else
            {
                context.Fail();
            }
        }
    }
}
