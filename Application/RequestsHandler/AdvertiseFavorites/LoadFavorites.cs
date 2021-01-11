using Application.Interfaces;
using Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.AdvertiseFavorites
{
    public class LoadFavorites
    {
        public class Query : IRequest<List<FavoriteAdvertiseDTO>>
        {

        }

        public class Handler : IRequestHandler<Query, List<FavoriteAdvertiseDTO>>
        {
            private readonly DataContext dataContext;
            private readonly ICurrentUser currentUser;

            public Handler(DataContext dataContext, ICurrentUser currentUser)
            {
                this.dataContext = dataContext;
                this.currentUser = currentUser;
            }
            public async Task<List<FavoriteAdvertiseDTO>> Handle(Query request, CancellationToken cancellationToken)
            {


                var userAdvertiseFavs = await dataContext
                    .UserAdvertiseFavorite
                    .Where(x => x.AppUserId == currentUser.UserId)
                    .Select(x => new FavoriteAdvertiseDTO
                    {
                        Id = x.Advertise.Id,
                        UniqueId = x.Advertise.UniqueId,
                        Price = x.Advertise.Price,
                        Title = x.Advertise.Title,
                        AdvertiseInfoDTO = new FavoriteAdvertiseInfoDTO
                        {
                            Hint = x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Hint,
                        },
                        User = new AdvertiseUser
                        {
                            FirstName = x.AppUser.FirstName,
                            LastName = x.AppUser.LastName,
                            UserName = x.AppUser.UserName,
                        }
                    })
                    .AsNoTracking().ToListAsync();

                return userAdvertiseFavs;
            }
        }
    }
}
