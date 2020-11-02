using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{
    public class Reviews
    {
        public int Id { get; set; }
        public string Content { get; set; }
        [Required]
        public int Rating { get; set; }
        [Required]
        public int ReadStateId { get; set; }
        public ReadState ReadState { get; set; }
    }
}
