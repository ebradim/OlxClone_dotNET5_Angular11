using Application.Interfaces;
using Application.Models;
using Domain;
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
    public class Send
    {
        public class Command : IRequest<SendOfferDTO>
        {
            public string AdvertiseId { get; set; }

            public string Title { get; set; }
            public string Message { get; set; }
        }

        public class Handler : IRequestHandler<Command, SendOfferDTO>
        {
            private readonly DataContext dataContext;
            private readonly ICurrentUser currentUser;

            public Handler(DataContext dataContext,ICurrentUser currentUser)
            {
                this.dataContext = dataContext;
                this.currentUser = currentUser;
            }
            public async Task<SendOfferDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var sender = await dataContext.Users.FirstOrDefaultAsync(x => x.Id == currentUser.UserId);
                if (sender is null)
                    throw new HttpContextException(HttpStatusCode.NotFound, new { User = "User is not found" });

                var receiver = await dataContext.UserAdvertise.Where(x => x.Advertise.UniqueId == request.AdvertiseId)
                    .Select(x=>x.AppUser)
                    .FirstOrDefaultAsync();
                if (receiver.Id == sender.Id)
                    throw new HttpContextException(HttpStatusCode.Forbidden, new { User = "You can't offer yourself" });

                //var lastTime = await dataContext.UserOffers.OrderByDescending(x=>x.SentAt)
                //    .Where(x => x.SenderId == sender.Id && x.ReceiverId==receiver.Id).Select(x => x.SentAt)
                //    .FirstOrDefaultAsync();
               
                //if((DateTime.UtcNow - lastTime).TotalDays < 1)
                //{
                //    throw new HttpContextException(HttpStatusCode.Forbidden, new { User = "You can't send more than one offer perday to the same person" });
                //}

                var userOffer = new UserOffer
                {
                    Sender = sender,
                    Receiver =receiver,
                    SentAt = DateTime.UtcNow,
                    Message = request.Title,
                    Title=request.Message
                };
                await dataContext.UserOffers.AddAsync(userOffer);

                var success = await dataContext.SaveChangesAsync() > 0;
                if(success){
                    return new SendOfferDTO{
                        AdvertiseId=request.AdvertiseId,
                        SenderName = $"{userOffer.Sender.FirstName} {userOffer.Sender.LastName}",
                        Title = userOffer.Title,
                        Message= userOffer.Message
                    };
                }else{
                    throw new Exception("ERROR WHILE SENDING OFFER");
                }
            }
        }
    }
}
