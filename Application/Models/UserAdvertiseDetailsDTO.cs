using Domain;
using Newtonsoft.Json;
using System;

namespace Application.Models
{
    public class UserAdvertiseDetailsDTO
    {

        [JsonProperty("userAdvertise")]
        public Root Root { get; set; }
     


    }
  
}
