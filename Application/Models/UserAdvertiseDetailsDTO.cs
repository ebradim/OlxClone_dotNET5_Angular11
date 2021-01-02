using Domain;
using Newtonsoft.Json;
using System;

namespace Application.Models
{
    public class UserAdvertiseDetailsDTO
    {

        [JsonProperty("advertise")]
        public Root Root { get; set; }
     


    }
  
}
