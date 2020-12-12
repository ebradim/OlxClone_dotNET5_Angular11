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
        public async Task<string> GenerateJwtAsync(AppUser user)
        {
            var claim = new List<Claim>
            {
                new Claim("_cuser",user.Id)
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
            var token = $"{Guid.NewGuid()} {Guid.NewGuid()} {userName}";
            var encoded = Encoding.UTF8.GetBytes(token);
            return Convert.ToBase64String(encoded);
        }

        public async Task<(string, string, string)> GenerateRequired(AppUser user)
        {
            var token = await this.GenerateJwtAsync(user);
            var rt =  this.GenerateRefreshToken();
            var st =  this.GenerateStateToken();

            return (token, rt, st);
        }

        public string GenerateStateToken()
        {
            return Guid.NewGuid().ToString();
        }
    }
}