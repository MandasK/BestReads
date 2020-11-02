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
        Task<Book> GetSelectedBook(string googleId);
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
                return openBookResponse.items.Select(book => new Book
                {
                    Title = book.volumeInfo?.title,
                    GoogleId = book.id,
                    ImageLocation = book.volumeInfo.imageLinks?.thumbnail,
                    About = book.volumeInfo?.description,
                    PageCount = book.volumeInfo.pageCount,
                    PublishDate = book.volumeInfo?.publishedDate,
                    Authors = book.volumeInfo?.authors

                }).ToList();


            }
            else
            {
                throw new OpenBookException(response.StatusCode, "Error response from Google Books API: " + response.ReasonPhrase);
            }
        }

        public async Task<Book> GetSelectedBook(string googleId)
        {
            string url = BuildGetBookUrl(googleId);
            

            var client = _httpFactory.CreateClient("OpenBookClient");
            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var jsonOpts = new JsonSerializerOptions { IgnoreNullValues = true, PropertyNameCaseInsensitive = true };
                var contentStream = await response.Content.ReadAsStreamAsync();
                var openBookResponse = await JsonSerializer.DeserializeAsync<GetBookResponse>(contentStream, jsonOpts);
               
                var book = new Book()
                {
                    Title = openBookResponse.volumeInfo?.title,
                    GoogleId = openBookResponse.id,
                    ImageLocation = openBookResponse.volumeInfo.imageLinks?.thumbnail,
                    About = openBookResponse.volumeInfo?.description,
                    PageCount = openBookResponse.volumeInfo.pageCount,
                    PublishDate = openBookResponse.volumeInfo?.publishedDate,
                    Authors = openBookResponse.volumeInfo?.authors
                };

                return book;

            }
            else
            {
                throw new OpenBookException(response.StatusCode, "Error response from Google Books API: " + response.ReasonPhrase);
            }
        }


        private string BuildOpenBookUrl(string query)
        {
            return $"https://www.googleapis.com/books/v1/volumes?q=" +
                $"\"{query}\"";       
        }

        private string BuildGetBookUrl(string googleId)
        {
            return $"https://www.googleapis.com/books/v1/volumes/{googleId}";
        }
    }

   
}
