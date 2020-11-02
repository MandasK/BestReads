
using BestReads.Models;
using BestReads.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BestReads.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IReviewsRepository _reviewsRepository;

        public ReviewsController(IReviewsRepository reviewsRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _reviewsRepository = reviewsRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_reviewsRepository.GetAllReviews());
        }

        [HttpGet("{id}")]
        public IActionResult GetByID(int id)
        {
            return Ok(_reviewsRepository.GetReviewById(id));
        }

        [HttpGet("{numberOfPost}/{block}")]
        public IActionResult Get(int numberOfPost, int block)
        {
            return Ok(_reviewsRepository.GetRecommendedBooks(numberOfPost, block));
        }

        [HttpGet("{bookId}/getReviewsByBook")]
        public IActionResult GetReviewsByBookId(int bookId)
        {
            return Ok(_reviewsRepository.GetReviewsByBookId(bookId));
        }

        [HttpPost]
        public IActionResult Add(Reviews review)
        {
            var reviewCheck = _reviewsRepository.GetReviewById(review.Id);
            if (reviewCheck == null)
            {
                _reviewsRepository.Add(review);
                return Ok(review);
            }
            return Ok(reviewCheck);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Reviews review)
        {
            if (review == null)
            {
                return BadRequest();
            }
            _reviewsRepository.Update(review);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUser();
            var review = _reviewsRepository.GetReviewById(id);
            if (currentUserProfile.Id != review.ReadState.User.Id)
            {
                return Unauthorized();
            }
            _reviewsRepository.Delete(id);
            return NoContent();
        }

        private Users GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
