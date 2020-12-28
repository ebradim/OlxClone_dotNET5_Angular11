using Domain;
using Newtonsoft.Json;
using System;

namespace Application.Models
{
    public class UserAdvertiseEditQueryDTO
    {

        [JsonProperty("userAdvertise")]
        public RootEdit Root { get; set; }

        

    }
    public class AdvertiseEditDTO
    {

        public string District { get; set; }
        public string City { get; set; }
        public double Price { get; set; }
        public DateTime PublishedAt { get; set; }
        [JsonProperty("advertiseInfo")]
        public AdvertiseInfoEditDTO AdvertiseInfoEditDTO { get; set; }

    }
    public class AdvertiseInfoEditDTO
    {
        public string Color { get; set; }
        public string Description { get; set; }
        public string Hint { get; set; }
        public byte Quantity { get; set; }
    }
    public class RootEdit
    {
        public string Id { get; set; }
        public bool IsNegotiate { get; set; }
        public bool IsOnWarranty { get; set; }
        public Status Status { get; set; }
        public PaymentOption PaymentOption { get; set; }
        [JsonProperty("advertise")]
        public AdvertiseEditDTO AdvertiseEditDTO { get; set; }

    }
}
