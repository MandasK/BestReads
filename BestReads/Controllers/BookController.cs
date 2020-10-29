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
   
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ILogger<BooksController> _logger;
        private readonly IOpenBookService _bookService;
        private readonly IBookRepository _bookRepo;
        private readonly IUserRepository _userRepository;

        public BookController(IBookRepository bookRepository, IUserRepository userRepository, ILogger<BooksController> logger, IOpenBookService bookService)
        {
            _bookRepo = bookRepository;
            _userRepository = userRepository;
            _logger = logger;
            _bookService = bookService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bookRepo.GetAllBooks());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var book = _bookRepo.GetById(id);
            if(book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public IActionResult Post(Book book)
        {

            var bookCheck = _bookRepo.GetByGoogleId(book.GoogleId);
            if(bookCheck == null)
            {
                _bookRepo.Add(book);
                return Ok();
                //return CreatedAtAction("Get", new { id = book.Id }, book);
            }
            return Ok(bookCheck);

        }


        private Users GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
