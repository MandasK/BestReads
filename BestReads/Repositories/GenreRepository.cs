using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestReads.Models;
using BestReads.Utils;
using System.Runtime.InteropServices;

namespace BestReads.Repositories
{
    public class GenreRepository : BaseRepository, IGenreRepository
    {
        public GenreRepository(IConfiguration configuration) : base(configuration) { }

        public List<Genre> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, name
                        FROM Genre
                        ORDER BY name
                                       ";
                    var reader = cmd.ExecuteReader();
                    var genres = new List<Genre>();
                    while (reader.Read())
                    {
                        genres.Add(new Genre()
                        {
                            ID = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                        });
                    }

                    reader.Close();
                    return genres;
                }
            }
        }

        public Genre GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id,
                               name
                        FROM Genre
                        WHERE id = @id
                                       ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Genre genre = null;
                    if(reader.Read())
                    {
                        genre = new Genre()
                        {
                            ID = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                        };
                    }

                    reader.Close();
                    return genre;
                }
            }
        }

        public void Add(Genre genre)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Genre (id, name)
                        OUTPUT INSERTED.ID
                        VALUES (@id, @name)
                                       ";
                    DbUtils.AddParameter(cmd, "@name", genre.Name);

                    genre.ID = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
