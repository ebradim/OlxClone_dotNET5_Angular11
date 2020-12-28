using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public string AdvertiseId { get; set; }
        public Advertise Advertise { get; set; }

    }

}
