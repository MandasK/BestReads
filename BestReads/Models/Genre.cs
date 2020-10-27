using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{
    public class Genre
    {
        public int ID { get; set; }
        
        public string Name { get; set; }
    }
}
