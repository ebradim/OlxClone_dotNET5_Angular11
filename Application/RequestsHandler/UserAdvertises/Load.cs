using Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.UserAdvertises
{
    public class Load
    {
        
        public class Query : IRequest<List<LoadHomeAdvertiseDTO>>
        {
        }
        public class Handler : IRequestHandler<Query, List<LoadHomeAdvertiseDTO>>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<List<LoadHomeAdvertiseDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ad = await dataContext.UserAdvertise
                .Where(x=>x.Status != Domain.Status.Sold)
                .OrderByDescending(x=>x.Advertise.PublishedAt).Select(x=>new LoadHomeAdvertiseDTO
                    {
                        HomeAdvertises = new HomeAdvertiseDTO
                        {
  
                                UniqueId =x.Advertise.UniqueId,
                                City =x.Advertise.City,
                                District=x.Advertise.District,
                                Price=x.Advertise.Price,
                                Title=x.Advertise.Title,
                                AdvertiseInfoDTO =new HomeAdvertiseInfoDTO
                                {
                                    Hint =x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Hint,
                                },
                                User = new AdvertiseUser
                                {
                                    FirstName = x.AppUser.FirstName,
                                    LastName = x.AppUser.LastName,
                                    UserName = x.AppUser.UserName
                                }
                           
                        }
                    }).Take(20).AsNoTracking().ToListAsync();

                
                    return ad;

            }
        }
    }
}
