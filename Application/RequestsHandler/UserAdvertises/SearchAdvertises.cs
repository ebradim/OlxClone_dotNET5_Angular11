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
    public class SearchAdvertises
    {
        public class Query : IRequest<IEnumerable<GroupedAdvertisesResult>>
        {
            public string Term { get; set; }
        }
        public class Handler : IRequestHandler<Query, IEnumerable<GroupedAdvertisesResult>>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<IEnumerable<GroupedAdvertisesResult>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await RunAdvertiseQuery(request).ToListAsync();

                var grouped = result.GroupBy(c => c.Category, a => a.AdvertiseResult, (c, a) => new GroupedAdvertisesResult {Category= c, AdvertiseResult= a });
                return grouped;
            }

            private IQueryable<SearchAdvertisesResultDTO> RunAdvertiseQuery(Query request)
            {
                return dataContext
                                    .UserAdvertise
                                    .Where(x => x.Advertise.Title.ToLower().Contains(request.Term.ToLower())
                                    
                                        ||
                                        x.Advertise.AdvertiseInfo.Hint.ToLower().Contains(request.Term.ToLower())
                                        || 
                                        x.Advertise.AdvertiseInfo.Description.ToLower().Contains(request.Term.ToLower())
                                    )
                                    .Select(x => new SearchAdvertisesResultDTO
                                    {
                                       Category = x.Category,
                                       AdvertiseResult = new AdvertiseResult
                                       {
                                           Title = x.Advertise.Title,
                                           Hint=x.Advertise.AdvertiseInfo.Hint,
                                           Price=x.Advertise.Price,
                                           UniqueId=x.Advertise.UniqueId,
                                           SellerName =$"{x.AppUser.FirstName} {x.AppUser.LastName}"
                                       }

                                    }).Take(10).AsNoTracking();
            }
        }
    }
}
