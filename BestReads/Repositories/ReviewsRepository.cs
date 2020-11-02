using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using BestReads.Repositories;
using BestReads.Models;
using BestReads.Utils;
using Microsoft.Data.SqlClient;

namespace BestReads.Repositories
{
    public class ReviewsRepository : BaseRepository, IReviewsRepository
    {
        public ReviewsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Reviews> GetReviewsByBookId(int bookId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Content, r.Rating, r.ReadStateId,
                               rs.StateId, rs.UserId, rs.BookId,
                               s.Title,
                               u.Name, u.DisplayName
                        FROM Reviews r
                        LEFT JOIN ReadState rs on r.ReadStateId = rs.Id
                        LEFT JOIN State s on rs.StateId = s.Id
                        LEFT JOIN Users u on rs.UserId = u.Id
                        WHERE rs.BookId = @bookId
                                       ";
                    DbUtils.AddParameter(cmd, "@bookId", bookId);

                    var reader = cmd.ExecuteReader();
                    var reviews = new List<Reviews>();
                    while(reader.Read())
                    {
                        reviews.Add(new Reviews
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            ReadState = new ReadState()
                            {
                                Id = DbUtils.GetInt(reader, "ReadStateId"),
                                BookId = DbUtils.GetInt(reader, "BookId"),
                                State = new State()
                                {
                                    ID= DbUtils.GetInt(reader, "StateId"),
                                    Title= DbUtils.GetString(reader, "title")
                                },
                                User = new Users()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name= DbUtils.GetString(reader, "Name"),
                                    DisplayName= DbUtils.GetString(reader, "DisplayName")
                                }
                            }

                        });
                    }

                    reader.Close();
                    return reviews;
                }
            }
        }

        public List<Reviews> GetAllReviews()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Content, r.Rating, r.ReadStateId,
                               rs.StateId, rs.UserId, rs.BookId,
                               s.Title,
                               u.Name, u.DisplayName
                        FROM Reviews r
                        LEFT JOIN ReadState rs on r.ReadStateId = rs.Id
                        LEFT JOIN State s on rs.StateId = s.Id
                        LEFT JOIN Users u on rs.UserId = u.Id
                                       ";

                    var reader = cmd.ExecuteReader();
                    var reviews = new List<Reviews>();
                    while(reader.Read())
                    {
                        reviews.Add(new Reviews
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            ReadState = new ReadState()
                            {
                                Id = DbUtils.GetInt(reader, "ReadStateId"),
                                BookId = DbUtils.GetInt(reader, "BookId"),
                                State = new State()
                                {
                                    ID = DbUtils.GetInt(reader, "StateId"),
                                    Title = DbUtils.GetString(reader, "Ttitle")
                                },
                                User = new Users()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                }
                            }
                        });
                    }
                    reader.Close();
                    return reviews;
                }
            }
        }

        public Reviews GetReviewById(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Content, r.Rating, r.ReadStateId,
                               rs.StateId, rs.UserId, rs.BookId,
                               s.Title,
                               u.Name, u.DisplayName
                        FROM Reviews r
                        LEFT JOIN ReadState rs on r.ReadStateId = rs.Id
                        LEFT JOIN State s on rs.StateId = s.Id
                        LEFT JOIN Users u on rs.UserId = u.Id
                        WHERE r.Id = @id
                                       ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Reviews review = null;
                    if (reader.Read())
                    {
                        review = new Reviews()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            ReadState = new ReadState()
                            {
                                Id = DbUtils.GetInt(reader, "ReadStateId"),
                                BookId = DbUtils.GetInt(reader, "BookId"),
                                State = new State()
                                {
                                    ID = DbUtils.GetInt(reader, "StateId"),
                                    Title = DbUtils.GetString(reader, "title")
                                },
                                User = new Users()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                }
                            }
                        };
                    }
                    reader.Close();
                    return review;
                }
            }
        }

        public void Add(Reviews review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Reviews (Content, Rating, ReadStateId)
                        OUTPUT INSERTED.ID
                        VALUES (@Content, @Rating, @ReadStateId)
                                       ";
                    DbUtils.AddParameter(cmd, "@Content", review.Content);
                    DbUtils.AddParameter(cmd, "@Rating", review.Rating);
                    DbUtils.AddParameter(cmd, "@ReadStateid", review.ReadStateId);
                    review.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Reviews review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Reviews
                        SET Content = @Content,
                            Rating = @Rating
                        WHERE Id = @id
                                       ";
                    DbUtils.AddParameter(cmd, "@id", review.Id);
                    DbUtils.AddParameter(cmd, "@Content", review.Content);
                    DbUtils.AddParameter(cmd, "@Rating", review.Rating);

                    cmd.ExecuteNonQuery();
                }

            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Reviews
                        WHERE Id = @id
                                       ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //Get 5 random books with Review rating above 4 by other users.
        public List<Reviews> GetRecommendedBooks(int numberOfPost, int block)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT TOP 5 r.id AS ReviewId, r.Rating, r.Content, r.ReadStateId,
                                     rs.StateId, rs.UserId, rs.BookId,
                                     u.Name as UserName, u.DisplayName, 
                                     b.Title, b.ImageLocation, b.Authors, b.About, b.PageCount, b.PublishDate
                        FROM Reviews r
                        LEFT JOIN ReadState rs on r.ReadStateId = rs.Id
                        LEFT JOIN Users u on rs.UserId = u.Id
                        LEFT JOIN Books b on rs.BookId = b.Id
                        WHERE r.Rating >= 4 AND rs.UserId != @block
                        ORDER BY newId()
                                       ";
                    DbUtils.AddParameter(cmd, "@numberOfPost", numberOfPost);
                    DbUtils.AddParameter(cmd, "@block", block);

                    var reader = cmd.ExecuteReader();

                    var reviews = new List<Reviews>();
                    while(reader.Read())
                    {
                        reviews.Add(new Reviews()
                        {
                            Id = DbUtils.GetInt(reader, "ReviewId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            ReadState = new ReadState()
                            {
                                Id = DbUtils.GetInt(reader, "ReadStateId"),
                                User = new Users()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "UserName"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                },
                                Book = new Book()
                                {
                                    Id = DbUtils.GetInt(reader, "BookId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                    About = DbUtils.GetString(reader, "About"),
                                    PageCount = DbUtils.GetInt(reader, "PageCount"),
                                    PublishDate = DbUtils.GetString(reader, "PublishDate"),
                                    Authors = new List<string>()
                                        {
                                            reader.GetString(reader.GetOrdinal("Authors"))
                                        },
                                },
                            },

                        });
                    }

                    reader.Close();
                    return reviews;
                }
            }
        }
    }
}
