using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class AdvertiseInfo
    {
        [Key]
        public int Id { get; set; }

        public string Hint { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public byte Quantity { get; set; }

        public int AdvertiseId { get; set; }
        public Advertise Advertise { get; set; }

    }

}
