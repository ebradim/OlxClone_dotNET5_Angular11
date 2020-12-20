using Application.Interfaces;
using Application.Models;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.User
{
    public class Login
    {
        public class AccountLogin : IRequest<AuthUserDTO>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }
        public class Handler : IRequestHandler<AccountLogin, AuthUserDTO>
        {
            private readonly DataContext dataContext;
            private readonly UserManager<AppUser> userManager;
            private readonly SignInManager<AppUser> signInManager;
            private readonly IHttpContextAccessor contextAccessor;
            private readonly ITokenGenerator jwtGenerator;
            private readonly IRefreshTokenGenerator refreshTokenGenerator;
            private readonly IAuthCookies authCookies;

            public Handler(DataContext dataContext, UserManager<AppUser> userManager,SignInManager<AppUser> signInManager,IHttpContextAccessor contextAccessor,
                ITokenGenerator jwtGenerator, IRefreshTokenGenerator refreshTokenGenerator,IAuthCookies authCookies)
            {
                this.dataContext = dataContext;
                this.userManager = userManager;
                this.signInManager = signInManager;
                this.contextAccessor = contextAccessor;
                this.jwtGenerator = jwtGenerator;
                this.refreshTokenGenerator = refreshTokenGenerator;
                this.authCookies = authCookies;
            }
            public async Task<AuthUserDTO> Handle(AccountLogin request, CancellationToken cancellationToken)
            {
                var user = await dataContext.Users.FirstOrDefaultAsync(x=>x.UserName == request.UserName);

                if (user is null)
                    throw new HttpContextException(HttpStatusCode.BadRequest, new { User = "Username is not exist" });

               var result= await signInManager.CheckPasswordSignInAsync(user, request.Password,false);
                if (result.Succeeded)
                {
                    
                     var refreshToken = refreshTokenGenerator.Generate(user.UserName);
                     var token = new RefreshToken { Token = refreshToken, AppUser = user, CreatedAt = DateTime.UtcNow, ExpireAt = DateTime.UtcNow.AddDays(2) };
                     await dataContext.RefreshTokens.AddAsync(token, cancellationToken);
                     
                     var success = await dataContext.SaveChangesAsync() > 0;
                     if (success)
                     {
                         await authCookies.SendAuthCookies(user, token.Token);
                     }
                        // Todo: Add refresh token to Redis
                    
                  

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
