using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace BestReads.Infrastructure
{
    public class OpenBookException : Exception
    {
        public HttpStatusCode StatusCode { get; }
        public OpenBookException() { }
        public OpenBookException(HttpStatusCode statusCode)
            => StatusCode = statusCode;
        public OpenBookException(HttpStatusCode statusCode, string message) : base(message)
            => StatusCode = statusCode;
        public OpenBookException(HttpStatusCode statusCode, string message, Exception inner) : base(message, inner)
            => StatusCode = statusCode;
    }
}
