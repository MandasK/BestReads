using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using BestReads.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BestReads.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreRepository _genreRepo;
        public GenreController(IGenreRepository genreRepository)
        {
            _genreRepo = genreRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_genreRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var genre = _genreRepo.GetById(id);
            if(genre == null)
            {
                return NotFound();
            }
            return Ok(genre);
        }
    }
}
