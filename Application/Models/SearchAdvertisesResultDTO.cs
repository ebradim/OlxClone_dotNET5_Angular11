using System.Collections.Generic;

namespace Application.Models
{
    public class SearchAdvertisesResultDTO
    {
        public string Category { get; set; }
        public AdvertiseResult AdvertiseResult { get; set; }
    }

    public class AdvertiseResult
    {
        public string UniqueId { get; set; }
        public string Title { get; set; }
        public string Hint { get; set; }
        public double Price { get; set; }
        public string SellerName { get; set; }
    }
    public class GroupedAdvertisesResult
    {
        public string Category { get; set; }
        public IEnumerable<AdvertiseResult> AdvertiseResult { get; set; }
    }
}
