using Domain;
using Newtonsoft.Json;
using System;
using System.ComponentModel;

namespace Application.Models
{
    public class LoadHomeAdvertiseDTO
    {
       
        [JsonProperty("userAdvertise")]
        public HomeAdvertiseDTO HomeAdvertises {get;set;}
        public LoadHomeAdvertiseDTO()
        {

        }
        public LoadHomeAdvertiseDTO(UserAdvertise userAdvertise)
        {
            HomeAdvertises = new HomeAdvertiseDTO
            { 
                UniqueId = userAdvertise.Advertise.UniqueId,
                Title = userAdvertise.Advertise.Title,
                District = userAdvertise.Advertise.District,
                City = userAdvertise.Advertise.City,
                Price = userAdvertise.Advertise.Price,
                AdvertiseInfoDTO = new HomeAdvertiseInfoDTO
                {
                    Hint = userAdvertise.Advertise.AdvertiseInfo.Hint,
                },
                    User = new AdvertiseUser{
                    FirstName= userAdvertise.AppUser.FirstName,
                    LastName = userAdvertise.AppUser.LastName,
                }
            };
            
                
                
        }
            

  
        
    }
    public class HomeAdvertiseDTO
    {
        public string UniqueId { get; set; }
        public string Title { get;  set; }
        public string District { get;  set; }
        public string City { get;  set; }
        public double Price { get;  set; }
        [JsonProperty("advertiseInfo")]
        public HomeAdvertiseInfoDTO AdvertiseInfoDTO { get; set; }
        [JsonProperty("user")]
        public AdvertiseUser User { get; set; }

    }
    public class HomeAdvertiseInfoDTO
    {
        public string Hint { get; set; }
    }

    
}
