using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Tokens
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly SymmetricSecurityKey key;
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration configuration;
        public TokenGenerator(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["secret_key"]));
        }

        public ClaimsPrincipal DecodeToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler()
                .ValidateToken(token, new TokenValidationParameters
                {
                    IssuerSigningKey = key,
                    SaveSigninToken = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,

                    ClockSkew = TimeSpan.Zero
                }, out var securityToken);
            
            return tokenHandler;
        }

        public async Task<string> GenerateJwtAsync(AppUser user)
        {
            var claim = new List<Claim>
            {
                new Claim("_cuser",user.Id),
            };
            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                claim.Add(new Claim(ClaimTypes.Role, role));
            }

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var descriptor = new SecurityTokenDescriptor
            {
                IssuedAt = DateTime.UtcNow,
                SigningCredentials = credentials,
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.UtcNow.AddMinutes(30),
                

            };
            var tokenHanlder = new JwtSecurityTokenHandler();
            var securityToken = tokenHanlder.CreateToken(descriptor);
            return tokenHanlder.WriteToken(securityToken);
        }

        public string GenerateRefreshToken(string userName = null)
        {
            var firstToken = $"{Guid.NewGuid()}-{DateTime.UtcNow}";
            var firstEncoded = Encoding.UTF8.GetBytes(firstToken);
            var firstPart =  Convert.ToBase64String(firstEncoded);

            return firstPart +Guid.NewGuid().ToString()+ "-" + Convert.ToBase64String(Encoding.UTF8.GetBytes(userName));
        }

        public async Task<(string, string, string)> GenerateRequired(AppUser user)
        {
            var token = await GenerateJwtAsync(user);
            var rt =  GenerateRefreshToken(user.UserName);
            var st =  GenerateStateToken(user.UserName);

            return (token, rt, st);
        }

        public string GenerateStateToken(string name)
        {
            return Guid.NewGuid().ToString() +"-"+ Convert.ToBase64String(Encoding.UTF8.GetBytes(name));
        }
    }
}