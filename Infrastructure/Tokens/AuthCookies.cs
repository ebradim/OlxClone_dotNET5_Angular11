using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Tokens
{
    public class AuthCookies : IAuthCookies
    {
        private readonly ITokenGenerator tokenGenerator;
        private readonly IHttpContextAccessor contextAccessor;
   
        public AuthCookies(ITokenGenerator tokenGenerator,IHttpContextAccessor contextAccessor)
        {
            this.tokenGenerator = tokenGenerator;
            this.contextAccessor = contextAccessor;
            
        }

    

        public async Task<RefreshToken> SendAuthCookies(AppUser user)
        {
            var (aid, rid, sid) = await tokenGenerator.GenerateRequired(user);
            contextAccessor.HttpContext.Response.Cookies.Append("_aid", aid,new CookieOptions { Expires =DateTime.UtcNow.AddMinutes(30),HttpOnly=true,Secure=false,SameSite=SameSiteMode.Unspecified,Domain=""});
            contextAccessor.HttpContext.Response.Cookies.Append("_rid", rid, new CookieOptions { Expires = DateTime.UtcNow.AddDays(2), HttpOnly = true, Secure = false, SameSite = SameSiteMode.Unspecified, Domain = "" });
            contextAccessor.HttpContext.Response.Cookies.Append("_sid", sid, new CookieOptions { Expires = DateTime.UtcNow.AddDays(2), HttpOnly = false, Secure = false, SameSite = SameSiteMode.Unspecified, Domain = "" });
            return  new RefreshToken
            {
                Token = rid,
                CreatedAt = DateTime.UtcNow,
                ExpireAt =DateTime.UtcNow.AddDays(2),
                AppUser = user
            };  
        }

        public async Task SendAuthCookies(AppUser user, string refreshToken = null)
        {
            var jwt = await tokenGenerator.GenerateJwtAsync(user);
            var st =  tokenGenerator.GenerateStateToken();
            contextAccessor.HttpContext.Response.Cookies.Append("_aid", jwt, new CookieOptions { Expires = DateTime.UtcNow.AddMinutes(30), HttpOnly = true, Secure = false, SameSite = SameSiteMode.Unspecified, Domain = "localhost" });
            contextAccessor.HttpContext.Response.Cookies.Append("_rid", refreshToken, new CookieOptions { Expires = DateTime.UtcNow.AddDays(2), HttpOnly = true, Secure = false, SameSite = SameSiteMode.Unspecified, Domain = "localhost" });
            contextAccessor.HttpContext.Response.Cookies.Append("_sid", st, new CookieOptions { Expires = DateTime.UtcNow.AddDays(2), HttpOnly = false, Secure = false, SameSite = SameSiteMode.Unspecified, Domain = "localhost" });

        }

        public string GetRefreshAndClearAll()
        {
            var refresh = contextAccessor.HttpContext.Request.Cookies["_rid"];
            foreach (var item in contextAccessor.HttpContext.Request.Cookies)
            {
                contextAccessor.HttpContext.Response.Cookies.Delete(item.Key);
            }
            return refresh;
        }
    }
}
