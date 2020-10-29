using BestReads.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Repositories
{
    public interface IGenreRepository
    {
        void Add(Genre genre);
        List<Genre> GetAll();
        Genre GetById(int id);
    }
}
