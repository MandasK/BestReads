using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{

    public class OpenBookResponse
    {
        public Volumeinfo volumeInfo { get; set; }
    }

    public class Volumeinfo
    {
        public string title { get; set; }
        public string description { get; set; }
        public List<string> authors { get; set; }
        public string publishedDate { get; set; }
        public int pageCount { get; set; }
        public List<string> categories { get; set; }

        public Imagelinks imageLinks { get; set; }

    }



    public class Imagelinks
    {
        public string smallThumbnail { get; set; }
        public string thumbnail { get; set; }
    }

}











