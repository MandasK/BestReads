
using BestReads.Models;
using BestReads.Repositories;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IUserRepository _userRepository;


        public ReadStateController(IReadStateRepository readStateRepository, IBookRepository bookRepository, IUserRepository userRepository)
        {
            _readStateRepository = readStateRepository;
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
        
        [HttpGet("{id}/details")]
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
        public IActionResult Put(ReadState readState)
        {
            if (readState == null)
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
