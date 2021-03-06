﻿using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.AdvertiseFavorites
{
    public class Add
    {
        public class Command : IRequest<bool>
        {
            public string AdvertiseId { get; set; }
        }

        public class Handler : IRequestHandler<Command, bool>
        {
            private readonly DataContext dataContext;
            private readonly ICurrentUser currentUser;

            public Handler(DataContext dataContext,ICurrentUser currentUser)
            {
                this.dataContext = dataContext;
                this.currentUser = currentUser;
            }
            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await dataContext.Users.FirstOrDefaultAsync(x => x.Id == currentUser.UserId);
                if (user is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { User = "User is not found" });


                var advertise = await dataContext.Advertise.FirstOrDefaultAsync(x => x.UniqueId == request.AdvertiseId);
                if (advertise is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { Advertise = "Advertise is not found" });



                


                var userAdFav = new UserFavorite
                {
                    Advertise = advertise,
                    AppUser = user
                };
                await dataContext.UserFavorites.AddAsync(userAdFav);
                return await dataContext.SaveChangesAsync() > 0;
               

            }
        }
    }
}
