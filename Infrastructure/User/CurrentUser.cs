using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace Infrastructure.User
{
    public class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor httpContext;
        public CurrentUser(IHttpContextAccessor httpContext)
        {
            this.httpContext = httpContext;
        }
        public string UserId
        {
            get
            {
                var id = httpContext.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == "_cuser")?.Value;
                return id;
            }
        }

    }
}
