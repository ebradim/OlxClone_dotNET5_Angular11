using Application.Interfaces;
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

namespace Application.RequestsHandler.AdvertiseFavorites
{
    public class UserAdFavRemove
    {
        public class AdFavRemove : IRequest<bool>
        {
            public string AdvertiseId { get; set; }
        }

        public class Handler : IRequestHandler<AdFavRemove, bool>
        {
            private readonly DataContext dataContext;
            private readonly ICurrentUser currentUser;

            public Handler(DataContext dataContext, ICurrentUser currentUser)
            {
                this.dataContext = dataContext;
                this.currentUser = currentUser;
            }
            public async Task<bool> Handle(AdFavRemove request, CancellationToken cancellationToken)
            {
                var user = await dataContext.Users.FirstOrDefaultAsync(x => x.Id == currentUser.UserId);
                if (user is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { User = "User is not found" });


              



                var userAdvertise = await dataContext.UserAdvertiseFavorite
                    .FirstOrDefaultAsync(x => x.AppUserId == currentUser.UserId && x.Advertise.UniqueId == request.AdvertiseId);
                if (userAdvertise is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { UserAdvertise = "UserAdvertise is not exist your in favorite list" });


                dataContext.UserAdvertiseFavorite.Remove(userAdvertise);
                return await dataContext.SaveChangesAsync() > 0;


            }
        }
    }
}
