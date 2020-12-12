using Application;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> logger;

        public ErrorHandlingMiddleware(RequestDelegate next,ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            this.logger = logger;
        }

        public async Task Invoke(HttpContext httpContext)
        {

            try
            {
                await _next(httpContext);
            }
            catch (HttpContextException ex)
            {
                await HandleAsync(httpContext,ex, logger);
            }
            
        }

        private async Task HandleAsync(HttpContext httpContext, HttpContextException ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;
            httpContext.Response.StatusCode = (int)ex.Code;
            errors = ex.Errors;
            logger.LogError(ex, "HttpContext _ ERROR");
            if(errors != null)
            {
                httpContext.Response.ContentType = "application/json";
                var serialize = JsonConvert.SerializeObject(new { errors });


                await httpContext.Response.WriteAsync(serialize);
            }
        }
    }
}
