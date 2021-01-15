using Application.Interfaces;
using Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.Offers
{
    public class Load
    {
        public class Query : IRequest<LoadOffersDTO>
        {

        }

        public class Handler : IRequestHandler<Query, LoadOffersDTO>
        {
            private readonly DataContext dataContext;
            private readonly ICurrentUser currentUser;

            public Handler(DataContext dataContext, ICurrentUser currentUser)
            {
                this.dataContext = dataContext;
                this.currentUser = currentUser;
            }
            public async Task<LoadOffersDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await dataContext.Users.FirstOrDefaultAsync(x => x.Id == currentUser.UserId);
                if (user is null)
                    throw new HttpContextException(HttpStatusCode.NotFound, new { User = "User is not found" });


                var receivedOffers = await dataContext.UserOffers
                    .Where(x => x.ReceiverId == currentUser.UserId)
                    .Select(x => new MyOffer
                    {
                        DisplayName = $"{x.Sender.FirstName} {x.Sender.LastName}",
                        UserName = x.Sender.UserName,
                        Title = x.Title,
                        Message = x.Message,
                        SentAt = x.SentAt
                    })
                    .AsNoTracking().ToListAsync();

                var sentOffers = await dataContext.UserOffers.Where(x => x.SenderId == currentUser.UserId)
                        .Select(x => new MyOffer
                        {
                            DisplayName = $"{x.Receiver.FirstName} {x.Receiver.LastName}",
                            UserName = x.Receiver.UserName,
                            Title = x.Title,
                            Message = x.Message,
                            SentAt = x.SentAt
                        })
                    .AsNoTracking().ToListAsync();

                return new LoadOffersDTO(receivedOffers, sentOffers);

              
            }
        }
    }
}
