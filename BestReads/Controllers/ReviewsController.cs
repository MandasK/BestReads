using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestReads.Models;
using BestReads.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BestReads.Services;
using BestReads.Infrastructure;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BestReads.Controllers
{
    [Authorize]
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

        [HttpPut]
        public IActionResult Put(int id, Reviews review)
        {
            var currentUserProfile = GetCurrentUser();
            if (currentUserProfile.Id != _reviewsRepository.GetReviewById(id).ReadState.UserId)
            {
                return Unauthorized();
            }
            if(id != review.Id)
            {
                return BadRequest();
            }
            _reviewsRepository.Update(review);
            return Ok(review);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUser();
            if(currentUserProfile.Id != _reviewsRepository.GetReviewById(id).ReadState.Id)
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
