using Application.Models;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS
{
    public class ReadUsers
    {
        public class Query : IRequest<List<UserAdvertise>>
        {

        }
        public class Handler : IRequestHandler<Query, List<UserAdvertise>>
        {
            private readonly DataContext dataContext;
            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;

            }
            public async Task<List<UserAdvertise>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await dataContext.
                UserAdvertise.Include(x=>x.Advertise).ThenInclude(x=>x.AdvertiseInfo).Include(x=>x.AppUser).AsNoTracking().ToListAsync();
                return users;
            }
        }
    }
}