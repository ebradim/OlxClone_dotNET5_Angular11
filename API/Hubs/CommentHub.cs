namespace API.Hubs
{
    using Application.RequestsHandler.Comments;
    using MediatR;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.SignalR;
    using System.Linq;
    using System.Threading.Tasks;
    [Authorize]
    public class CommentHub : Hub
    {

        private readonly IMediator mediator;

        public CommentHub(IMediator mediator)
        {
            this.mediator = mediator;
        }
        public async Task JoinGroupComments(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            //var userNameId = Context.User.Claims.First(x => x.Type == "_unid").Value;
            //await Clients.Group(groupName).SendAsync("Send", $"@{userNameId} has joined the group {groupName}.");
        }
        //.com/advertise/idddd

        public async Task StartCommenting(string userName,string groupName)
        {
            var userNameId = Context.User.Claims.First(x => x.Type == "_unid").Value;
            if (userName != userNameId)
            {
                // to not send to him self, and to not display 'someone is typing' when the current user is typing
                await Clients.Group(groupName).SendAsync("ReceiveSomeoneIsTyping", userName);
            }

            
        }

        public async Task SendComment(string groupName,string userName, Send.Command comment)
        {
            var userNameId = Context.User.Claims.First(x => x.Type == "_unid").Value;

            if (userName != userNameId)
            {
                // to not send to him self
                // the comment will be added to DOM with NgRx
                // or u can remove this 'conditional statement'
                var result = await mediator.Send(comment);

                await Clients.Group(groupName).SendAsync("ReceiveComment", result);
            }
        }

        public async Task LeaveGroupComments(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            //var userNameId = Context.User.Claims.First(x => x.Type == "_unid").Value;
            //await Clients.Group(groupName).SendAsync("Send", $"@{userNameId} has left the group {groupName}.");       
        }
    }
}
