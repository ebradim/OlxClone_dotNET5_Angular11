using MediatR;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.User
{
    public class ForgeryToken
    {
        public class Generate : IRequest
        {

        }
        public class Handler : IRequestHandler<Generate>
        {
            private readonly IAntiforgery antiforgery;
            private readonly IHttpContextAccessor contextAccessor;

            public Handler(IAntiforgery antiforgery,IHttpContextAccessor contextAccessor)
            {
                this.antiforgery = antiforgery;
                this.contextAccessor = contextAccessor;
            }
            public Task<Unit> Handle(Generate request, CancellationToken cancellationToken)
            {
                var token = antiforgery.GetAndStoreTokens(contextAccessor.HttpContext);
                var forgeryToken = token.RequestToken;
                contextAccessor.HttpContext.Response.Cookies.Append("_fid", forgeryToken);

                return Unit.Task;
            }
        }
    }
}
