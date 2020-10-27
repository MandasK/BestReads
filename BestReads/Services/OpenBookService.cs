using BestReads.Infrastructure;
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
        Task<List<Book>> SearchForBook(string query);
    }
    public class OpenBookService : IOpenBookService
    {
        private readonly IHttpClientFactory _httpFactory;

        public OpenBookService(IHttpClientFactory httpFactory)
        {
            _httpFactory = httpFactory;
        }

        public async Task<List<Book>> SearchForBook(string query)
        {
            string url = BuildOpenBookUrl(query);
            var books = new List<Book>();

            var client = _httpFactory.CreateClient("OpenBookClient");
            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var jsonOpts = new JsonSerializerOptions { IgnoreNullValues = true, PropertyNameCaseInsensitive = true };
                var contentStream = await response.Content.ReadAsStreamAsync();
                var openBookResponse = await JsonSerializer.DeserializeAsync<OpenBookResponse>(contentStream, jsonOpts);
                foreach (var book in openBookResponse.items)
                {
                    books.Add(new Book
                    {
                        Title = book.volumeInfo.title,
                        GoogleId = book.id,
                        ImageLocation = book.volumeInfo.imageLinks.thumbnail,
                        About = book.volumeInfo.description,
                        PageCount = book.volumeInfo.pageCount,
                        PublishDate = book.volumeInfo.publishedDate,
                        AverageRating = book.volumeInfo.averageRating,
                        RatingCount = book.volumeInfo.ratingsCount,
                        Authors = book.volumeInfo.authors,
                        Genres = book.volumeInfo.categories

                    }) ;
                }

                return books;
                
            }
            else
            {
                throw new OpenBookException(response.StatusCode, "Error response from Google Books API: " + response.ReasonPhrase);
            }
        }


        private string BuildOpenBookUrl(string query)
        {
            return $"https://www.googleapis.com/books/v1/volumes?q={query}";
                   
                   
        }
    }

   
}
