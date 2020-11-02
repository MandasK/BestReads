using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{

    public class GetBookResponse
    {
       
        public string id { get; set; }
        public BookInfo volumeInfo { get; set; }
      
    }

    public class BookInfo
    {
        public string title { get; set; }
        public List<string> authors { get; set; }
        public string publishedDate { get; set; }
        public string description { get; set; }
        public int pageCount { get; set; }
        public List<string> categories { get; set; }
        public Imagelink imageLinks { get; set; }
        
    }



    public class Imagelink
    {
        public string smallThumbnail { get; set; }
        public string thumbnail { get; set; }
        public string small { get; set; }
        public string medium { get; set; }
        public string large { get; set; }
        public string extraLarge { get; set; }
    }

}

  

 



