using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestReads.Models;
using BestReads.Utils;
using Microsoft.Extensions.Configuration;

namespace BestReads.Repositories
{
    public class ReadStateRepository : BaseRepository, IReadStateRepository
    {
        public ReadStateRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(ReadState readState)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ReadState (StateId, UserId, BookId)
                        OUTPUT INSERTED.ID
                        VALUES (@StateId, @UserId, @BookId)
                                       ";
                    DbUtils.AddParameter(cmd, "@StateId", readState.StateId);
                    DbUtils.AddParameter(cmd, "@UserId", readState.UserId);
                    DbUtils.AddParameter(cmd, "BookId", readState.BookId);

                    readState.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<ReadState> GetAllReadStates()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT rs.Id, rs.StateId, rs.BookId, rs.UserId,
                               s.Title AS StateTitle,
                               u.Name, u.DisplayName, u.Bio, u.ImageLocation as UserImageLocation,
                               b.GoogleId, b.Title AS BookTitle, b.ImageLocation AS BookImageLocation, b.About, b.Authors,
                               b.PageCount, b.PublishDate
                        FROM ReadState rs
                        LEFT JOIN State s on rs.StateId = s.Id
                        LEFT JOIN Users u on rs.UserId = u.Id
                        LEFT JOIN Books b on rs.BookId = b.Id
                        Order By StateTitle
                                       ";
                    var reader = cmd.ExecuteReader();
                    var readStates = new List<ReadState>();
                    while (reader.Read())
                    {
                        readStates.Add(new ReadState()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            State = new State()
                            {
                                ID= DbUtils.GetInt(reader, "StateId"),
                                Title= DbUtils.GetString(reader, "StateTitle"),
                            },
                            User = new Users()
                            {
                                Id= DbUtils.GetInt(reader, "StateId"),
                                Name= DbUtils.GetString(reader, "Name"),
                                DisplayName= DbUtils.GetString(reader, "DisplayName"),
                                Bio= DbUtils.GetString(reader, "Bio"),
                                ImageLocation= DbUtils.GetString(reader, "UserImageLocation"),
                            },
                            BookId = DbUtils.GetInt(reader, "BookId"),
                            Book = new Book()
                            {
                                Id= DbUtils.GetInt(reader, "BookId"),
                                GoogleId= DbUtils.GetString(reader, "GoogleId"),
                                Title= DbUtils.GetString(reader, "BookTitle"),
                                ImageLocation= DbUtils.GetString(reader, "BookImageLocation"),
                                About= DbUtils.GetString(reader, "About"),
                                Authors = new List<string>()
                                    {
                                        reader.GetString(reader.GetOrdinal("Authors"))
                                    }
                            },
                        });
                    }

                    reader.Close();
                    return readStates;
                }
            }
        }

        public List<ReadState> GetAllUserReadStates(int currentUserId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT rs.Id, rs.StateId, rs.BookId, rs.UserId,
                               s.Title AS StateTitle,
                               u.Name, u.DisplayName, u.Bio, u.ImageLocation as UserImageLocation,
                               b.GoogleId, b.Title AS BookTitle, b.ImageLocation AS BookImageLocation, b.About, b.Authors,
                               b.PageCount, b.PublishDate
                        FROM ReadState rs
                        LEFT JOIN State s on rs.StateId = s.Id
                        LEFT JOIN Users u on rs.UserId = u.Id
                        LEFT JOIN Books b on rs.BookId = b.Id
                        WHERE rs.UserId = @id
                        ORDER BY StateTitle
                                       ";
                    DbUtils.AddParameter(cmd, "@id", currentUserId);

                    var reader = cmd.ExecuteReader();

                    var readStates = new List<ReadState>();
                    while (reader.Read())
                    {
                        readStates.Add(new ReadState()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            State = new State()
                            {
                                ID = DbUtils.GetInt(reader, "StateId"),
                                Title = DbUtils.GetString(reader, "StateTitle"),
                            },
                            User = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "StateId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Bio = DbUtils.GetString(reader, "Bio"),
                                ImageLocation = DbUtils.GetString(reader, "UserImageLocation"),
                            },
                            Book = new Book()
                            {
                                Id = DbUtils.GetInt(reader, "BookId"),
                                GoogleId = DbUtils.GetString(reader, "GoogleId"),
                                Title = DbUtils.GetString(reader, "BookTitle"),
                                ImageLocation = DbUtils.GetString(reader, "BookImageLocation"),
                                About = DbUtils.GetString(reader, "About"),
                                Authors = new List<string>()
                                {
                                    reader.GetString(reader.GetOrdinal("Authors"))
                                }
                            },
                        });
                    }

                    reader.Close();
                    return readStates;
                }
            }
        }

        public ReadState GetReadStateById (int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT rs.Id, rs.StateId, rs.BookId, rs.UserId,
                               s.Title AS StateTitle,
                               u.Name, u.DisplayName, u.Bio, u.ImageLocation as UserImageLocation,
                               b.GoogleId, b.Title AS BookTitle, b.ImageLocation AS BookImageLocation, b.About, b.Authors,
                               b.PageCount, b.PublishDate
                        FROM ReadState rs
                        LEFT JOIN State s on rs.StateId = s.Id
                        LEFT JOIN Users u on rs.UserId = u.Id
                        LEFT JOIN Books b on rs.BookId = b.Id
                        WHERE rs.Id = @id
                                       ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    ReadState readState = null;
                    if(reader.Read())
                    {
                        readState = new ReadState()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            State = new State()
                            {
                                ID = DbUtils.GetInt(reader, "StateId"),
                                Title = DbUtils.GetString(reader, "StateTitle"),
                            },
                            User = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Bio = DbUtils.GetString(reader, "Bio"),
                                ImageLocation = DbUtils.GetString(reader, "UserImageLocation"),
                            },
                            Book = new Book()
                            {
                                Id = DbUtils.GetInt(reader, "BookId"),
                                GoogleId = DbUtils.GetString(reader, "GoogleId"),
                                Title = DbUtils.GetString(reader, "BookTitle"),
                                ImageLocation = DbUtils.GetString(reader, "BookImageLocation"),
                                About = DbUtils.GetString(reader, "About"),
                                PublishDate=DbUtils.GetString(reader, "PublishDate"),
                                PageCount = DbUtils.GetNullableInt(reader, "PageCount"),
                                Authors = new List<string>()
                                {
                                    reader.GetString(reader.GetOrdinal("Authors"))
                                }
                            },
                        };
                    }

                    reader.Close();

                    return readState;
                }
            }
        }


        public void ChangeState(ReadState readState)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ReadState
                        SET StateId = @StateId
                        WHERE Id = @id
                                       ";
                    DbUtils.AddParameter(cmd, "@StateId", readState.StateId);
                    DbUtils.AddParameter(cmd, "@id", readState.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
    
}
