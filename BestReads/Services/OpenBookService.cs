using BestReads.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace BestReads.Services
{
    public interface IOpenBookService
    {
        Task<Books> SearchForBook(string query);
    }
    public class OpenBookService : IOpenBookService
    {
        private readonly IHttpClientFactory _httpFactory;

        public OpenBookService(IHttpClientFactory httpFactory)
        {
            _httpFactory = httpFactory;
        }

        public async Task<Books> SearchForBook(string query)
        {
            string url = BuildOpenBookUrl(query);
            

            var client = _httpFactory.CreateClient("OpenBookClient");
            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var jsonOpts = new JsonSerializerOptions { IgnoreNullValues = true, PropertyNameCaseInsensitive = true };
                var contentStream = await response.Content.ReadAsStreamAsync();
                var openBookResponse = await JsonSerializer.DeserializeAsync<OpenBookResponse>(contentStream, jsonOpts);

                var books = new Books()
                {
                    Title = openBookResponse.volumeInfo.title,
                    ImageLocation = openBookResponse.volumeInfo.imageLinks.thumbnail,
                    About = openBookResponse.volumeInfo.description,
                    Author= openBookResponse.volumeInfo.authors,
                    Genres= openBookResponse.volumeInfo.categories
                };
           
                return books;
            }
            else
            {
                throw new OpenBookException(response.StatusCode, "Error response from Google Books API: " + response.ReasonPhrase)
            }
        }


        private string BuildOpenBookUrl(string query)
        {
            return $"https://www.googleapis.com/books/v1/volumes?q={query}";
                   
                   
        }
    }

   
}
