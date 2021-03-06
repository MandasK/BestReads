﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestReads.Models;
using BestReads.Utils;
using System.Net;

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
                               publishDate
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
                            PageCount = DbUtils.GetNullableInt(reader, "pageCount"),
                            PublishDate = DbUtils.GetString(reader, "publishDate"),
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
                               publishDate
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
                            PageCount = DbUtils.GetNullableInt(reader, "pageCount"),
                            PublishDate = DbUtils.GetString(reader, "publishDate"),
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
        public Book GetByGoogleId(string googleId)
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
                               publishDate
                        FROM Books
                        Where googleId = @googleId
                                       ";
                    DbUtils.AddParameter(cmd, "@googleId", googleId);

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
                            PageCount = DbUtils.GetNullableInt(reader, "pageCount"),
                            PublishDate = DbUtils.GetString(reader, "publishDate"),
                            Authors = new List<string>()
                            {
                                reader.GetString(reader.GetOrdinal("Authors"))
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
                                                           publishDate)
                                        OUTPUT INSERTED.ID
                                        VALUES (@title, 
                                               @imageLocation, 
                                               @about, 
                                               @authors,
                                               @googleId,
                                               @pageCount, 
                                               @publishDate)";
                    DbUtils.AddParameter(cmd, "@title", book.Title);
                    DbUtils.AddParameter(cmd, "@imageLocation", book.ImageLocation);
                    DbUtils.AddParameter(cmd, "@about", book.About);
                    DbUtils.AddParameter(cmd, "@googleId", book.GoogleId);
                    DbUtils.AddParameter(cmd, "@authors", book.Authors[0]);
                    DbUtils.AddParameter(cmd, "@pageCount", book.PageCount);
                    DbUtils.AddParameter(cmd, "@publishDate", book.PublishDate);

                    book.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}

