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
                List<FilteredDTO> result =null;
                var id = await dataContext.Advertise
                .Where(x => x.UniqueId == request.AdvertiseId)
                .AsNoTracking()
                .Select(x => x.Id).FirstOrDefaultAsync();
                if(request.AdvertiseId is not null && request.Category is not null){
        
                if(id > 0){
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
                }

                if(request.Category is  null && request.AdvertiseId is  null){
                    result = await dataContext.UserAdvertise
                                                       
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
            
                   
                if(request.AdvertiseId is not null && request.Category is null){
                  
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
                
                if(request.AdvertiseId is null && request.Category is not null){
                     result = await dataContext.UserAdvertise
                             .Where(x=>x.Category.ToLower() == request.Category.ToLower())                           
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
                string last = null;
                if(result.Count > 0){
                last = result?.First(x=>x?.Id == result?.Max(x=>x?.Id))?.UniqueId ?? null;

                }
                return new FilteredSearchDTO{
                    LastId = last , 
                    FilteredDTO= result ?? null
                };
                throw new HttpContextException(HttpStatusCode.NotFound, new { Id="Last id is not correct"});

            
            }
        }
    }
}
