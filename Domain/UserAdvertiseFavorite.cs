using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserAdvertiseFavorite
    {
        public int AdvertiseId { get; set; }
        public Advertise Advertise { get; set; }


        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
