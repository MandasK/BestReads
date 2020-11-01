using BestReads.Models;
using System.Collections.Generic;

namespace BestReads.Repositories
{
    public interface IReviewsRepository
    {
        void Add(Reviews review);
        void Delete(int id);
        List<Reviews> GetAllReviews();
        List<Reviews> GetRecommendedBooks(int numberOfPost, int block);
        Reviews GetReviewById(int id);
        List<Reviews> GetReviewsByBookId(int bookId);
        void Update(Reviews review);
    }
}