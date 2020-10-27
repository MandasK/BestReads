using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{
    public class Books
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }
        [Required]
        public string About { get; set; }
        [Required]
        public List<string> Author { get; set; }
        public List<string> Genres { get; set; }
        public int GenreId { get; set; }
        
    }
}
