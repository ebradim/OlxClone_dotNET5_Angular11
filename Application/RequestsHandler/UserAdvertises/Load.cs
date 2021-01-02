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
    public class UserAdLoad
    {
        
        public class LoadAds : IRequest<List<UserAdvertiseDetailsDTO>>
        {
        }
        public class Handler : IRequestHandler<LoadAds, List<UserAdvertiseDetailsDTO>>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<List<UserAdvertiseDetailsDTO>> Handle(LoadAds request, CancellationToken cancellationToken)
            {
                var ad = await dataContext.UserAdvertise
                .Where(x=>x.Status != Domain.Status.Sold).OrderByDescending(x=>x.Advertise.PublishedAt).Select(x=>new UserAdvertiseDetailsDTO
                    {
                        Root = new Root
                        {
                           Category= x.Category,
                            IsNegotiate =x.IsNegotiate,
                            IsOnWarranty =x.IsOnWarranty,
                            PaymentOption =x.PaymentOption,
                            AdvertiseDTO = new AdvertiseDTO
                            {
                                
                                Id = x.AdvertiseId,
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
                       
                    }).Take(20).AsNoTracking().ToListAsync();
                return ad;
            }
        }
    }
}
