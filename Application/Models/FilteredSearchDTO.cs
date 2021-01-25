using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class FilteredSearchDTO
    {
        public string LastId { get; set; }
        [JsonProperty("advertises")]
        public List<FilteredDTO> FilteredDTO { get; set; }
    }
    public class FilteredDTO
    {
        public string UniqueId { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public double Price { get; set; }
        [JsonProperty("advertiseInfo")]
        public HomeAdvertiseInfoDTO AdvertiseInfoDTO { get; set; }
        [JsonProperty("user")]
        public AdvertiseUser User { get; set; }
        public string ImageUrl { get; set; }

    }
   
}
