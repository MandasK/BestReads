using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        public string GoogleId { get; set; }
        public string Title { get; set; }
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }
        [Required]
        public string About { get; set; }
        public int PageCount { get; set; }
        public string PublishDate { get; set;}
        public float AverageRating { get; set; }
        public int RatingCount { get; set; }

        [Required]
        public List<string> Authors { get; set; }
        public List<string> Genres { get; set; }
        
        
    }
}
