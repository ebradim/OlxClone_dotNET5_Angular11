using Application.Interfaces;
using Application.Models;
using Domain;
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
        public class Refresh : IRequest<AuthUserDTO>
        {

        }
        public class Handler : IRequestHandler<Refresh, AuthUserDTO>
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

            public async Task<AuthUserDTO> Handle(Refresh request, CancellationToken cancellationToken)
            {
                var refresh_token = contextAccessor.HttpContext.Request.Cookies["_rid"];
                if(refresh_token is null || refresh_token.Length ==0)
                    throw new HttpContextException(HttpStatusCode.Unauthorized,new {User = "Your session is expired"});
                // Todo: if it belongs to user
                var userToken = await dataContext.RefreshTokens.Where(x=>x.Token == refresh_token).Select(x=>new RefreshToken{
                    Token = x.Token,
                    UserId = x.UserId,
                    ExpireAt =x.ExpireAt,
                    RevokedAt = x.RevokedAt,
                    ReplacedByToken = x.ReplacedByToken

                }).FirstOrDefaultAsync();
                var user = await dataContext.Users
                .Where(x=>x.Id == userToken.UserId)
                .Select(x=> new AppUser{FirstName =x.FirstName,LastName=x.LastName,UserName=x.UserName,Id=x.Id})
                .FirstOrDefaultAsync();


                // yes?
                if (userToken is not null && userToken.IsActive)
                {

                    if (userToken.IsAboutToExpire)
                    { 
                        var newtoken = refreshTokenGenerator.Generate(user.UserName);
                        userToken.RevokedAt = DateTime.UtcNow;
                        userToken.ReplacedByToken = newtoken;
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
          
                    return new AuthUserDTO(user);

                   


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
