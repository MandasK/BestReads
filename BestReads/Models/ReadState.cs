using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{
    public class ReadState
    {
        public int Id { get; set; }
        [Required]
        public int StateId { get; set; }
        public State State { get; set; }
        [Required]
        public int UserId { get; set; }
        public Users User { get; set; }
        [Required]
        public int BookId { get; set; }
        public Books Book { get; set; }
    }
}
