using Application.Interfaces;
using Application.Models;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Persistence;
using System;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.User
{
    public class TokenRefresh
    {
        public class Refresh : IRequest<AuthUserDTO>
        {

        }
        public class Handler : IRequestHandler<Refresh, AuthUserDTO>
        {
            private readonly DataContext dataContext;
            private readonly IHttpContextAccessor contextAccessor;
            private readonly ITokenGenerator jwtGenerator;
            private readonly ICurrentUser currentUser;
            private readonly ITokenGenerator tokenGenerator;
            private readonly IRefreshTokenGenerator refreshTokenGenerator;
            private readonly IDistributedCache cache;
            private readonly IAuthCookies cookies;

            public Handler(DataContext dataContext, IHttpContextAccessor contextAccessor,ITokenGenerator jwtGenerator,ICurrentUser currentUser,ITokenGenerator tokenGenerator, IDistributedCache cache,IAuthCookies cookies)
            {
                this.dataContext = dataContext;
                this.contextAccessor = contextAccessor;
                this.jwtGenerator = jwtGenerator;
                this.currentUser = currentUser;
                this.tokenGenerator = tokenGenerator;
                this.cache = cache;
                this.cookies = cookies;
            }

            public async Task<AuthUserDTO> Handle(Refresh request, CancellationToken cancellationToken)
            {
                var refreshToken = contextAccessor.HttpContext.Request.Cookies["_rid"];
                var state_token = contextAccessor.HttpContext.Request.Cookies["_sid"];
                if(refreshToken is null || refreshToken.Length <1 || state_token.Length<1)
                    throw new HttpContextException(HttpStatusCode.Unauthorized,new {User = "Your session is expired"});
                // Todo: if it belongs to user
                var base64User = refreshToken[(refreshToken.LastIndexOf('-')+1)..];

                var id = await cache.GetRefreshToken("rid-" + base64User);
                if(id is not null)
                {
                    var userName = Encoding.UTF8.GetString(Convert.FromBase64String(base64User));
                    var user = await dataContext.Users
                                     .Where(x => x.UserName == userName)
                                     .Select(x => new AppUser {UserName = x.UserName, Id = x.Id,UserRoles = x.UserRoles })
                                     .AsNoTracking()
                                     .FirstOrDefaultAsync();
                    //generate and send new

                    var newToken  = await cookies.SendAuthCookies(user);
                    await cache.RemoveAsync("rid-"+ base64User);
                    var key = "rid-" + Convert.ToBase64String(Encoding.UTF8.GetBytes(user.UserName));
                    await cache.SetRefreshToken(key, newToken.Token);
                    return new AuthUserDTO(user);

                }
                else
                {

                    contextAccessor.HttpContext.Response.Cookies.Delete("_sid");
                    throw new HttpContextException(HttpStatusCode.Unauthorized, new { Token = "Your token is expired, Log in again" });
                }


               
                

            }

        }
    }
}
