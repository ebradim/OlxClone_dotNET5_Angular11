using Application.Interfaces;
using MediatR;
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
    public class Logout
    {
        public class AccountLogoutRequest: IRequest<bool>
        {

        }
        public class Handler : IRequestHandler<AccountLogoutRequest, bool>
        {
            private readonly DataContext dataContext;
            private readonly IAuthCookies authCookies;

            public Handler(DataContext dataContext, IAuthCookies authCookies)
            {
                this.dataContext = dataContext;
                this.authCookies = authCookies;
            }
            public async Task<bool> Handle(AccountLogoutRequest request, CancellationToken cancellationToken)
            {
                var refresh = authCookies.GetRefreshAndClearAll();
                var token = await dataContext.RefreshTokens.Where(x => x.Token == refresh).FirstOrDefaultAsync();
                if(token is not null)
                {
                    token.RevokedAt = DateTime.UtcNow;
                    token.ReplacedByToken = "OnLogout";
                    return await dataContext.SaveChangesAsync() > 0;

                }
                else
                {
                    throw new HttpContextException(HttpStatusCode.NotFound, new { Token = "Unknown token" });
                }


            }
        }
    }
}
