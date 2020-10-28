using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestReads.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BestReads.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepo;

        public BookController(IBookRepository bookRepository)
        {
            _bookRepo = bookRepository;
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
    }
}
