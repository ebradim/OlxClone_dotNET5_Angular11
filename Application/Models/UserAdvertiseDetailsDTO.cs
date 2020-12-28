using Domain;
using Newtonsoft.Json;
using System;

namespace Application.Models
{
    public class UserAdvertiseDetailsDTO
    {

        [JsonProperty("advertise")]
        public Root Root { get; set; }
        [JsonProperty("user")]
        public AdvertiseUser User { get; set; }


    }
    public class AdvertiseUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
    }
}
