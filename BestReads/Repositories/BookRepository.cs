using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestReads.Models;
using BestReads.Utils;

namespace BestReads.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {
        public BookRepository(IConfiguration configuration) : base(configuration) { }

        public List<Book> GetAllBooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id,
                               title, 
                               imageLocation, 
                               about, 
                               authors,
                               googleId,
                               pageCount, 
                               publishDate, 
                               averageRating,
                               RatingCount
                        FROM Books
                        ORDER BY title
                                      ";

                    var reader = cmd.ExecuteReader();
                    var books = new List<Book>();
                    while (reader.Read())
                    {
                        books.Add(new Book()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Title = DbUtils.GetString(reader, "title"),
                            ImageLocation = DbUtils.GetString(reader, "imageLocation"),
                            About = DbUtils.GetString(reader, "about"),
                            GoogleId = DbUtils.GetString(reader, "googleId"),
                            PageCount = DbUtils.GetInt(reader, "pageCount"),
                            PublishDate = DbUtils.GetString(reader, "publishDate"),
                            AverageRating = DbUtils.GetInt(reader, "averageRating"),
                            RatingCount = DbUtils.GetInt(reader, "RatingCount"),
                            Authors = new List<string>()
                            {
                            DbUtils.GetString(reader, "authors"),
                            }
                        });
                    }

                    reader.Close();
                    return books;
                }
            }
        }


        public Book GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Select id,
                               title, 
                               imageLocation, 
                               about, 
                               authors,
                               googleId,
                               pageCount, 
                               publishDate, 
                               averageRating,
                               RatingCount
                        FROM Books
                        Where id = @id
                                       ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Book book = null;
                    if (reader.Read())
                    {
                        book = new Book()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Title = DbUtils.GetString(reader, "title"),
                            ImageLocation = DbUtils.GetString(reader, "imageLocation"),
                            About = DbUtils.GetString(reader, "about"),
                            GoogleId = DbUtils.GetString(reader, "googleId"),
                            PageCount = DbUtils.GetInt(reader, "pageCount"),
                            PublishDate = DbUtils.GetString(reader, "publishDate"),
                            AverageRating = DbUtils.GetInt(reader, "averageRating"),
                            RatingCount = DbUtils.GetInt(reader, "RatingCount"),
                            Authors = new List<string>()
                            {
                                DbUtils.GetString(reader, "authors"),
                            }
                        };
                    }

                    reader.Close();
                    return book;
                }
            }
        }

        public void Add(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Books (title, 
                                                           imageLocation, 
                                                           about, 
                                                           authors,
                                                           googleId,
                                                           pageCount, 
                                                           publishDate, 
                                                           averageRating,
                                                           RatingCount)
                                        OUTPUT INSERTED.ID
                                        VALUES (@title, 
                                               @imageLocation, 
                                               @about, 
                                               @authors,
                                               @googleId,
                                               @pageCount, 
                                               @publishDate, 
                                               @averageRating,
                                               @RatingCount)";
                    DbUtils.AddParameter(cmd, "@title", book.Title);
                    DbUtils.AddParameter(cmd, "@imageLocation", book.ImageLocation);
                    DbUtils.AddParameter(cmd, "@about", book.About);
                    DbUtils.AddParameter(cmd, "@googleId", book.Authors);
                    DbUtils.AddParameter(cmd, "@pageCount", book.PageCount);
                    DbUtils.AddParameter(cmd, "@publishDate", book.PublishDate);
                    DbUtils.AddParameter(cmd, "@averageRating", book.AverageRating);
                    DbUtils.AddParameter(cmd, "@RatingCount", book.RatingCount);

                    book.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}

