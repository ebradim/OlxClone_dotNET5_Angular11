using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.User
{
    public class Logout
    {
        public class Query: IRequest<bool>
        {

        }
        public class Handler : IRequestHandler<Query, bool>
        {
            private readonly IAuthCookies authCookies;
            private readonly IHttpContextAccessor contextAccessor;
            private readonly IDistributedCache cache;

            public Handler( IAuthCookies authCookies,IHttpContextAccessor contextAccessor,IDistributedCache cache)
            {
                this.authCookies = authCookies;
                this.contextAccessor = contextAccessor;
                this.cache = cache;
            }
            public async Task<bool> Handle(Query request, CancellationToken cancellationToken)
            {
                var refreshToken = contextAccessor.HttpContext.Request.Cookies["_rid"];
                if(refreshToken is not null)
                {
                    var lastPart = refreshToken[(refreshToken.LastIndexOf('-')+1)..];
                    
                    var key = "rid-" + lastPart;
                    await cache.RemoveAsync(key);
                    var refresh = authCookies.GetRefreshAndClearAll();

                    return true;

                }
                else
                {
                    throw new HttpContextException(HttpStatusCode.NotFound, new { Token = "Unknown token" });
                }


            }
        }
    }
}
