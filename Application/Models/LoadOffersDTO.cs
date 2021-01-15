using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class LoadOffersDTO
    {
        public LoadOffersDTO(ICollection<MyOffer> receivedOffers, ICollection<MyOffer> sentOffers)
        {
            ReceivedOffers = receivedOffers;
            SentOffers = sentOffers;
        }

        public ICollection<MyOffer> ReceivedOffers { get; set; }
        public ICollection<MyOffer> SentOffers { get; set; }

    }

    public class MyOffer
    {

        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime SentAt { get; set; }
    }
}
