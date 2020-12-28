using Application.Models;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.UserAdvertises
{
    public class UserAdEdit
    {

        public class EditAD : IRequest<UserAdvertiseDTO>
        {
            public string Id { get; set; }
            public bool IsNegotiate { get; set; }
            public bool IsOnWarranty { get; set; }
            public Status Status { get; set; }
            public PaymentOption PaymentOption { get; set; }

            public string District { get; set; }
            public string City { get; set; }
            public double Price { get; set; }

            public AdvertiseInfo AdvertiseInfo { get; set; }
        }
        public class Handler : IRequestHandler<EditAD, UserAdvertiseDTO>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }

            public async Task<UserAdvertiseDTO> Handle(EditAD request, CancellationToken cancellationToken)
            {
                var ad = await dataContext.UserAdvertise.Include(x=>x.Advertise).ThenInclude(x=>x.AdvertiseInfo).FirstOrDefaultAsync(x => x.AdvertiseId == request.Id);
                if (ad is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { Advertise = "Advertise is not found" });
          
                ad.Status = request.Status;
                ad.IsNegotiate = request.IsNegotiate;
                ad.IsOnWarranty = request.IsOnWarranty;
                ad.PaymentOption = request.PaymentOption;
                ad.Advertise.District = request.District ?? ad.Advertise.District;
                ad.Advertise.City = request.City ?? ad.Advertise.City;
                ad.Advertise.Price = request.Price;
                ad.Advertise.AdvertiseInfo.Color = request.AdvertiseInfo.Color ?? ad.Advertise.AdvertiseInfo.Color;
                ad.Advertise.AdvertiseInfo.Description = request.AdvertiseInfo.Description ?? ad.Advertise.AdvertiseInfo.Description;
                ad.Advertise.AdvertiseInfo.Hint = request.AdvertiseInfo.Hint ?? ad.Advertise.AdvertiseInfo.Hint;
                ad.Advertise.AdvertiseInfo.Quantity = request.AdvertiseInfo.Quantity;
                var success = await dataContext.SaveChangesAsync() > 0;
                if (success)
                    return new UserAdvertiseDTO(ad);
                throw new Exception("Server Error - Details");
            }
        }
    }
}
