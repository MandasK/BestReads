using System.Net.Http;
using System.Text.Json.Serialization;

namespace BestReads.Models
{
    public class OpenBookErrorResponse
    {
        [JsonPropertyName("message")]
        public string Message { get; }
    }
}
