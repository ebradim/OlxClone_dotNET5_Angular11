using Application.RequestsHandler.Offers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Hubs
{
    [Authorize]
    public class OfferHub : Hub
    {
        private readonly IMediator mediator;

        public OfferHub(IMediator mediator)
        {
            this.mediator = mediator;
        }
        public async Task SendPrivateOffer(string userName,Send.Command command)
        {
            var userNameId = Context.User.Claims.First(x => x.Type == "_unid").Value;
            if(userName != userNameId)
            {
                var result = await mediator.Send(command);        
                await Clients.User(userName).SendAsync("ReceiveOffer", result);
            }
           

        }

        public override async Task OnConnectedAsync()
        {          
            await base.OnConnectedAsync();
        }
    
        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
