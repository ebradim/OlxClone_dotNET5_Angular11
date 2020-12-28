using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.UserAdvertises
{
    public class UserAdDelete
    {
        
        public class DeleteAdd : IRequest<bool>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<DeleteAdd, bool>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<bool> Handle(DeleteAdd request, CancellationToken cancellationToken)
            {
                var ad = await dataContext.UserAdvertise.FirstOrDefaultAsync(x => x.AdvertiseId == request.Id);
                if (ad is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { Advertise = "Advertise is not found" });

                dataContext.UserAdvertise.Remove(ad);
                return await dataContext.SaveChangesAsync() > 0;
            }
        }
    }
}
