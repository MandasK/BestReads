using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{ 
    public class OpenBookResponse
    {
        public int totalItems { get; set; }
        public Item[] items { get; set; }
    }

    public class Item
    {
        public string id { get; set; }
        public Volumeinfo volumeInfo { get; set; }

    }

    public class Volumeinfo
    {
        public string title { get; set; }
        public List<string> authors { get; set; }
        public string publishedDate { get; set; }
        public string description { get; set; }
        public int? pageCount { get; set; }
        public Imagelinks imageLinks { get; set; }
    }

    public class Imagelinks
    {
        public string smallThumbnail { get; set; }
        public string thumbnail { get; set; }
        public string small { get; set; }
        public string medium { get; set; }
        public string large { get; set; }
        public string extraLarge { get; set; }
    }
}




