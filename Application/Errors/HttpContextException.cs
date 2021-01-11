using System;
using System.Net;

namespace Application
{
    public class HttpContextException : Exception
    {
        public HttpContextException(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }

        public HttpStatusCode Code { get; }
        public object Errors { get; }
    }
}
