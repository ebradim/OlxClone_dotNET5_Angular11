using Domain;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAuthCookies
    {
        public Task<RefreshToken> SendAuthCookies(AppUser user);
        public Task SendAuthCookies(AppUser user,string refresToken = null);
        public string GetRefreshAndClearAll();
    }
}
