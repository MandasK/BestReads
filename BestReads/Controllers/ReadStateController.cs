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
    public class ReadStateController : ControllerBase
    {
        private readonly IReadStateRepository _readStateRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IUserRepository _userRepository;


        public ReadStateController(IReadStateRepository readStateRepository, IBookRepository bookRepository, IUserRepository userRepository)
        {
            _readStateRepository = readStateRepository;
            _bookRepository = bookRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_readStateRepository.GetAllReadStates());
        }

        [HttpGet("{currentUserId}/currentUserBooks")]
        public IActionResult GetAllBooksForUser(int currentUserId)
        {
            var readState = _readStateRepository.GetAllUserReadStates(currentUserId);
            return Ok(readState);
        }
        
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var readState = _readStateRepository.GetReadStateById(id);
            if(readState == null)
            {
                return NotFound();
            }
            return Ok(readState);
        }

        [HttpPost]
        public IActionResult Add(ReadState readState)
        {
            var readStateCheck = _readStateRepository.GetReadStateById(readState.Id);
            if(readStateCheck == null)
            {
                _readStateRepository.Add(readState);
                return Ok(readState);
            }
            return Ok(readStateCheck);
        }

        [HttpPut]
        public IActionResult Put(int id, ReadState readState)
        {
            var currentUserProfile = GetCurrentUser();
            if(currentUserProfile.Id != _readStateRepository.GetReadStateById(id).UserId)
            {
                return Unauthorized();
            }
            if (id != readState.Id)
            {
                return BadRequest();
            }
            _readStateRepository.ChangeState(readState);
            return Ok();

        }


        private Users GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
