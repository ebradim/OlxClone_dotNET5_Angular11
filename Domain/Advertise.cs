using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Advertise
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public DateTime PublishedAt { get; set; }
        public string City { get; set; }
        public string District { get; set; }

        public AdvertiseInfo AdvertiseInfo { get; set; }
        [JsonIgnore]
        public ICollection<UserAdvertise> UserAdvertises { get; set; }
        [JsonIgnore]
        public ICollection<UserAdvertiseFavorite> UserAdvertiseFavorites { get; set; }

    }
    public class AdvertiseUniqueId
    {
        public static string NewId(string title)
        {
            var g = Guid.NewGuid().ToString();
            var id = g.Substring(0, g.IndexOf('-'));
            var result=title.Replace(" ", "-");
            return $"{result}{id}";
        }
    }
}
