using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.User
{
    public class TokenRefresh
    {
        public class Refresh : IRequest<bool>
        {

        }
        public class Handler : IRequestHandler<Refresh, bool>
        {
            private readonly DataContext dataContext;
            private readonly IHttpContextAccessor contextAccessor;
            private readonly ITokenGenerator jwtGenerator;
            private readonly ICurrentUser currentUser;
            private readonly IRefreshTokenGenerator refreshTokenGenerator;

            public Handler(DataContext dataContext, IHttpContextAccessor contextAccessor,ITokenGenerator jwtGenerator,ICurrentUser currentUser,IRefreshTokenGenerator refreshTokenGenerator)
            {
                this.dataContext = dataContext;
                this.contextAccessor = contextAccessor;
                this.jwtGenerator = jwtGenerator;
                this.currentUser = currentUser;
                this.refreshTokenGenerator = refreshTokenGenerator;
            }

            public async Task<bool> Handle(Refresh request, CancellationToken cancellationToken)
            {
                var refresh_token = contextAccessor.HttpContext.Request.Cookies["_rid"];
                // Todo: if it belongs to user
                var user = await dataContext.Users.Include(x => x.RefreshTokens).Where(x => x.Id == currentUser.UserId).FirstOrDefaultAsync();


                var tokenIsExist = user.RefreshTokens.FirstOrDefault(x => x.Token == refresh_token);

                // yes?
                if (tokenIsExist is not null && tokenIsExist.IsActive)
                {

                    if (tokenIsExist.IsAboutToExpire)
                    { 
                        var newtoken = refreshTokenGenerator.Generate(user.UserName);
                        tokenIsExist.RevokedAt = DateTime.UtcNow;
                        tokenIsExist.ReplacedByToken = newtoken;
                        await dataContext.RefreshTokens.AddAsync(new Domain.RefreshToken
                        { 
                            CreatedAt = DateTime.UtcNow,
                            AppUser = user,
                            ExpireAt = DateTime.UtcNow.AddDays(2) 
                        });
                        var success =  await dataContext.SaveChangesAsync() > 0;
                        if (success)
                        {
                            contextAccessor.HttpContext.Response.Cookies.Append("_rid", newtoken, new CookieOptions 
                            { 
                                Expires = DateTime.UtcNow.AddDays(2),
                                HttpOnly = true, Secure = false, 
                                SameSite = SameSiteMode.Unspecified,
                                Domain = "localhost" }
                            );

                            contextAccessor.HttpContext.Response.Cookies.Append("_sid", Guid.NewGuid().ToString(), new CookieOptions 
                            { 
                                Expires = DateTime.UtcNow.AddDays(2), 
                                HttpOnly = false, Secure = false,
                                SameSite = SameSiteMode.Unspecified,
                                Domain = "localhost" }
                            );
                        }
                    }
                    var access_token = await jwtGenerator.GenerateJwtAsync(user);
                    
                    contextAccessor.HttpContext.Response.Cookies.Append("_aid", access_token, new CookieOptions 
                    {   
                        Expires = DateTime.UtcNow.AddMinutes(30),
                        HttpOnly = true, Secure = false,
                        SameSite = SameSiteMode.Unspecified,
                        Domain = "localhost" }
                    );
          
                    return true;

                   


                }
                else
                {
                  
                    contextAccessor.HttpContext.Response.Cookies.Delete("_sid");
                    throw new HttpContextException(HttpStatusCode.Unauthorized, new { Token ="Your token is expired, Log in again" });
                   
                     
                }
             
                //No ?
               
                

            }

        }
    }
}
