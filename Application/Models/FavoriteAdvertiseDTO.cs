using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{


    public class FavoriteAdvertiseDTO
    {
        public int Id { get; set; }
        public string UniqueId { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        [JsonProperty("advertiseInfo")]
        public FavoriteAdvertiseInfoDTO AdvertiseInfoDTO { get; set; }
        public AdvertiseUser User { get; set; }

    }
    public class FavoriteAdvertiseInfoDTO
    {
        public string Hint { get; set; }
    }
}
