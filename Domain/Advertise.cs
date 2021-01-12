using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Advertise
    {
        [Key]
        public int Id {get;set;}        
        public string UniqueId { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public DateTime PublishedAt { get; set; }
        public string City { get; set; }
        public string District { get; set; }

        public AdvertiseInfo AdvertiseInfo { get; set; }
        [JsonIgnore]
        public ICollection<UserAdvertise> UserAdvertises { get; set; }
        [JsonIgnore]
        public ICollection<UserFavorite> UserFavorites { get; set; }        
        public ICollection<UserLike> UserLikes { get; set; }

    }
    public class AdvertiseUniqueId
    {
        public static string NewId(string title)
        {
            var g = Guid.NewGuid().ToString();
            var id = g.Substring(0, g.IndexOf('-'));
            var result = title.EndsWith(" ") ? title.TrimEnd().Insert(title.Length - 1, " ").Replace(" ", "-") :
                                                          title.TrimEnd().Insert(title.Length, " ").Replace(" ", "-");
            return $"{result}{id}";
        }
    }
}
