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
        public string GoogleId { get; set; }
        public string Title { get; set; }
        public string ImageLocation { get; set; }       
        public string About { get; set; }
        public int? PageCount { get; set; }
        public string PublishDate { get; set;}
        public List<string> Authors { get; set; }
    }
}
