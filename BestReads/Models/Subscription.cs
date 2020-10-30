using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BestReads.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        [Required]
        //currentuser
        public int SubscriberUserProfileId { get; set; }
        [Required]
        //otheruser
        public int ProviderUserProfileId { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
    }
}
