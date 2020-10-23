using BestReads.Models;
using System.Collections.Generic;

namespace BestReads.Repositories
{
    public interface IUserRepository
    {
        void Add(Users user);
        List<Users> GetAll();
        Users GetByFirebaseUserId(string firebaseUserId);
        void Update(Users user);
    }
}