namespace Domain
{
    public class UserAdvertiseFavorite
    {
        public int AdvertiseId { get; set; }
        public Advertise Advertise { get; set; }


        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
