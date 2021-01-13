using Domain;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ITokenGenerator
    {
        public Task<string> GenerateJwtAsync(AppUser user);
        public string GenerateRefreshToken(string userName = null);
        public string GenerateStateToken(string username);


        public Task<(string, string, string)> GenerateRequired(AppUser user);


        public ClaimsPrincipal DecodeToken(string token);

    }
}