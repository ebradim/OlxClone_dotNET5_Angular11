using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserComments
    {
        public int Id { get; set; }

        public int AdvertiseId { get; set; }
        public Advertise Advertise { get; set; }
        public string CommenterId { get; set; }
        public AppUser Commenter { get; set; }

        public string Comment { get; set; }
        public DateTime CommentedAt { get; set; }

        public float PositiveAccuracy { get; set; }
        public float NegativeAccuracy { get; set; }

    }
}
