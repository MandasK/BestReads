using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BestReads.Infrastructure;
using BestReads.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BestReads.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ILogger<BooksController> _logger;
        private readonly IOpenBookService _bookService;

        public BooksController(ILogger<BooksController> logger, IOpenBookService bookService)
        {
            _logger = logger;
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> Search(string query)
        {
            if (string.IsNullOrEmpty(query))
                return BadRequest("query parameter is missing");
            try
            {
                var book = await _bookService.SearchForBook(query);
                return Ok(book);
            }
            catch (OpenBookException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                    return BadRequest($"Query: \"{ query }\" not found.");
                else
                    return StatusCode(500, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("{googleId}")]
        public async Task<IActionResult> GetByGoogleId(string googleId)
        {
            if (string.IsNullOrEmpty(googleId))
                return BadRequest("query parameter is missing");
            try
            {
                var book = await _bookService.GetSelectedBook(googleId);
                return Ok(book);
            }
            catch (OpenBookException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                    return BadRequest($"Query: \"{ googleId }\" not found.");
                else
                    return StatusCode(500, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
