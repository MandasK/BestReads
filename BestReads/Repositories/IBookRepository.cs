using BestReads.Models;
using System.Collections.Generic;

namespace BestReads.Repositories
{
    public interface IBookRepository
    {
        void Add(Book book);
        List<Book> GetAllBooks();
        Book GetById(int id);
    }
}