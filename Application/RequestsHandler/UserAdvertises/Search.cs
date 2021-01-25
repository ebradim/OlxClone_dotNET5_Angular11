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

namespace Application.RequestsHandler.UserAdvertises
{
    public class Search
    {
        public class Query : IRequest<FilteredSearchDTO>
        {
            public string AdvertiseId { get; set; }
            public string Category { get; set; }
        }
        public class Handler : IRequestHandler<Query, FilteredSearchDTO>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<FilteredSearchDTO> Handle(Query request, CancellationToken cancellationToken)
                {
                var id = await dataContext.Advertise.Where(x => x.UniqueId == request.AdvertiseId).AsNoTracking().Select(x => x.Id).FirstOrDefaultAsync();

                List<FilteredDTO> result;

                if(id > 0)
                {
                    if (request.Category is not null)
                    {
                        result = await dataContext.UserAdvertise
                            .Where(x => x.AdvertiseId > id 
                                && x.Category.ToLower() == request.Category.ToLower())
                            .Take(30).AsNoTracking().OrderByDescending(x => x.Advertise.PublishedAt)
                            .Select(x=>new FilteredDTO
                            {
                                Id=x.AdvertiseId,
                                UniqueId = x.Advertise.UniqueId,
                                City = x.Advertise.City,
                                District = x.Advertise.District,
                                Price = x.Advertise.Price,
                                Title = x.Advertise.Title,
                                ImageUrl = x.AdvertisePhotos.First().Url,
                                AdvertiseInfoDTO = new HomeAdvertiseInfoDTO
                                {
                                    Hint = x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Hint,
                                },
                                User = new AdvertiseUser
                                {
                                    FirstName = x.AppUser.FirstName,
                                    LastName = x.AppUser.LastName,
                                    UserName = x.AppUser.UserName
                                }
                            })
                            .ToListAsync();
                    }
                    else
                    {
                        result = await dataContext.UserAdvertise.Where(x => x.AdvertiseId > id )
                        .Take(30).AsNoTracking().OrderByDescending(x => x.Advertise.PublishedAt)
                          .Select(x => new FilteredDTO
                          {
                              Id = x.AdvertiseId,
                              UniqueId = x.Advertise.UniqueId,
                              City = x.Advertise.City,
                              District = x.Advertise.District,
                              Price = x.Advertise.Price,
                              Title = x.Advertise.Title,
                              ImageUrl = x.AdvertisePhotos.First().Url,
                              AdvertiseInfoDTO = new HomeAdvertiseInfoDTO
                              {
                                  Hint = x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Hint,
                              },
                              User = new AdvertiseUser
                              {
                                  FirstName = x.AppUser.FirstName,
                                  LastName = x.AppUser.LastName,
                                  UserName = x.AppUser.UserName
                              }
                          }).ToListAsync();
                    }

                    var lastId = result?.Find(x => x.Id == result.Max(x => x.Id))?.UniqueId;

                    return new FilteredSearchDTO
                    {
                        LastId = lastId,
                        FilteredDTO = result
                    };

                }

                throw new HttpContextException(HttpStatusCode.NotFound, new { Id="Last id is not correct"});

            }
        }
    }
}
