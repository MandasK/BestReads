using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BestReads.Models;
using BestReads.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BestReads.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUserRepository _userRepository;
        public SubscriptionController(ISubscriptionRepository subscriptionRepository, IUserRepository userRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _userRepository = userRepository;
        }

        [HttpGet("{subscriber}/{provider}")]
        public IActionResult Get(int subscriber, int provider)
        {
            var subscriptions = _subscriptionRepository.GetReleventSubscriptions(subscriber, provider);
            if(subscriptions == null)
            {
                return NotFound();
            }
            return Ok(subscriptions);
        }
        [HttpGet("GetAllUserSubscriptions")]
        public IActionResult GetAll()
        {
            var currentUserProfile = GetCurrentUserProfile();
            int subscriber = currentUserProfile.Id;
            var subscriptions = _subscriptionRepository.GetAllUserSubscriptions(subscriber);
            if(subscriptions == null)
            {
                return NotFound();
            }
            return Ok(subscriptions);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var subscription = _subscriptionRepository.GetSubscriptionById(id);
            if(subscription == null)
            {
                return NotFound();
            }
            return Ok(subscription);
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            var currentUserProfile = GetCurrentUserProfile();
            subscription.SubscriberUserProfileId = currentUserProfile.Id;
            _subscriptionRepository.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id)
        {
            _subscriptionRepository.UnSubscribe(id);
            return Ok();

        }

        private Users GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
