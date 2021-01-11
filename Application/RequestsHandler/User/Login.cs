using Application.Interfaces;
using Application.Models;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Persistence;
using System;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.User
{
    public class Login
    {
        public class Command : IRequest<AuthUserDTO>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }
        public class Handler : IRequestHandler<Command, AuthUserDTO>
        {
            private readonly DataContext dataContext;
            private readonly UserManager<AppUser> userManager;
            private readonly SignInManager<AppUser> signInManager;
            private readonly IHttpContextAccessor contextAccessor;
            private readonly ITokenGenerator jwtGenerator;
            private readonly IRefreshTokenGenerator refreshTokenGenerator;
            private readonly IAuthCookies authCookies;
            private readonly IDistributedCache cache;

            public Handler(DataContext dataContext, UserManager<AppUser> userManager,SignInManager<AppUser> signInManager,IHttpContextAccessor contextAccessor,
                ITokenGenerator jwtGenerator, IRefreshTokenGenerator refreshTokenGenerator,IAuthCookies authCookies, IDistributedCache cache)
            {
                this.dataContext = dataContext;
                this.userManager = userManager;
                this.signInManager = signInManager;
                this.contextAccessor = contextAccessor;
                this.jwtGenerator = jwtGenerator;
                this.refreshTokenGenerator = refreshTokenGenerator;
                this.authCookies = authCookies;
                this.cache = cache;
            }
            public async Task<AuthUserDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await dataContext.Users.FirstOrDefaultAsync(x=>x.UserName == request.UserName);

                if (user is null)
                    throw new HttpContextException(HttpStatusCode.BadRequest, new { User = "Username is not exist" });

               var result= await signInManager.CheckPasswordSignInAsync(user, request.Password,false);
                if (result.Succeeded)
                {
                    
                     var refreshToken = refreshTokenGenerator.Generate(user.UserName);
                
                    await authCookies.SendAuthCookies(user, refreshToken);
                    var key = "rid-" + Convert.ToBase64String(Encoding.UTF8.GetBytes(user.UserName));
                    await cache.SetRefreshToken(key, refreshToken);

                    return new AuthUserDTO(user);
                }
                else
                {
                    throw new HttpContextException(HttpStatusCode.BadRequest, new { User = "Password is wrong" });
                }
                throw new Exception("Server Error -Login");

            }
        }
    }
}
