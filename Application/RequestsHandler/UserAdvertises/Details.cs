using Application.Models;
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
    public class UserAdsDetails
    {
        public  class AdDetails : IRequest<UserAdvertiseDetailsDTO>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<AdDetails, UserAdvertiseDetailsDTO>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<UserAdvertiseDetailsDTO> Handle(AdDetails request, CancellationToken cancellationToken)
            {
                var ad = await dataContext
                    .UserAdvertise
                    .Where(x=>x.Advertise.UniqueId == request.Id)
                    .Select(x=>new UserAdvertiseDetailsDTO
                    {
                        Root = new Root
                        {
                            Status =x.Status,
                            IsNegotiate =x.IsNegotiate,
                            IsOnWarranty =x.IsOnWarranty,
                            PaymentOption =x.PaymentOption,
                            Category=x.Category,
                            AdvertiseDTO = new AdvertiseDTO
                            {
                                
                            Id = x.Advertise.Id,
                            UniqueId =x.Advertise.UniqueId,
                                City =x.Advertise.City,
                                District=x.Advertise.District,
                                PublishedAt=x.Advertise.PublishedAt,
                                Price=x.Advertise.Price,
                                Title=x.Advertise.Title,
                                AdvertiseInfoDTO =new AdvertiseInfoDTO
                                {
                                    Color =x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Color,
                                    Description =x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Description,
                                    Hint =x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Hint,
                                    Quantity =x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Quantity,
                                }
                            },
                              User = new AdvertiseUser
                                {
                                    FirstName = x.AppUser.FirstName,
                                    LastName = x.AppUser.LastName,
                                    UserName = x.AppUser.UserName,
                                }
                        }
                      
                    })
                    .AsNoTracking().FirstOrDefaultAsync();
                if (ad is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { Advertise = "Advertise is not found" });
                return ad;
            }
        }
    }
}
