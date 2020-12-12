using Application.Models;
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
        public class Query : IRequest<List<ReadUsersDTO>>
        {

        }
        public class Handler : IRequestHandler<Query, List<ReadUsersDTO>>
        {
            private readonly DataContext dataContext;
            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;

            }
            public async Task<List<ReadUsersDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await dataContext.
                Users.Select(x =>
                new ReadUsersDTO
                {
                    UserName = x.UserName,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Test = new Test { Email = x.Email }
                }

                ).AsNoTracking().ToListAsync();
                return users;
            }
        }
    }
}