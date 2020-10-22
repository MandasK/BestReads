using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{
    public class UserGenre
    {
        public int Id { get; set; }
        [Required]
        public int GenreId { get; set; }
        public Genre Genre {get; set;}
        [Required]
        public int UserId { get; set; }
        public Users User { get; set; }
    }
}
