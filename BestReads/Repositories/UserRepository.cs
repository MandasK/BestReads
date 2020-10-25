﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestReads.Models;
using BestReads.Utils;

namespace BestReads.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<Users> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name, Email, displayName, ImageLocation, Bio  
                            FROM Users
                            ORDER BY displayName
                                       ";

                    var reader = cmd.ExecuteReader();

                    var users = new List<Users>();
                    while (reader.Read())
                    {
                        users.Add(new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DisplayName = DbUtils.GetString(reader, "displayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            
                        });
                    }

                    reader.Close();
                    return users;
                }
            }
        }

        public Users GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, Name, Email, DisplayName,
                               ImageLocation, Bio
                          FROM Users
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    Users user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            Bio = DbUtils.GetString(reader, "Bio")

                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public Users GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id,
                               Name,
                               Email,
                               DisplayName,
                               ImageLocation,
                               Bio
                        FROM Users
                        WHERE ID = @id
                                       ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Users user = null;
                    if (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            Bio = DbUtils.GetString(reader, "Bio")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Users (FirebaseUserId, Name, Email, Bio, DisplayName, ImageLocation)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, @Email, @Bio, @DisplayName, @ImageLocation)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@ImageLocation", user.ImageLocation);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Users
                                        SET Name = @Name,
                                            Bio = @Bio,
                                            DisplayName = @displayName,
                                            Email = @email,
                                            FirebaseUserId = @firebaseUserId,
                                            ImageLocation = @imageLocation
                                    
                                        WHERE Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@displayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    DbUtils.AddParameter(cmd, "@firebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@imageLocation", user.ImageLocation);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
