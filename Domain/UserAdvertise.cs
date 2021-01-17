using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class UserAdvertise
    {
        public int AdvertiseId { get; set; }
        public Advertise Advertise { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public string Category {get;set;}
        public bool IsNegotiate { get; set; }
        public bool IsOnWarranty { get; set; }
        public Status Status { get; set; }
        public PaymentOption PaymentOption { get; set; }
        public ICollection<Photo> AdvertisePhotos { get; set; }

    }
    public enum Status { Pending = 0, Sold = 1 }
    public enum PaymentOption { Cash = 0, Exchange = 1 }
}
