using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.UserAdvertises
{
    public class Delete
    {
        
        public class Command : IRequest<bool>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, bool>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                var ad = await dataContext.UserAdvertise.FirstOrDefaultAsync(x => x.Advertise.UniqueId == request.Id);
                if (ad is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { Advertise = "Advertise is not found" });

                dataContext.UserAdvertise.Remove(ad);
                return await dataContext.SaveChangesAsync() > 0;
            }
        }
    }
}
