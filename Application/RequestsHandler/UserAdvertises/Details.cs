using Application.Interfaces;
using Application.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.UserAdvertises
{
    public class Details
    {
        public  class Query : IRequest<UserAdvertiseDTO>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, UserAdvertiseDTO>
        {
            private readonly DataContext dataContext;
            private readonly ITokenGenerator tokenGenerator;
            private readonly IHttpContextAccessor contextAccessor;

            public Handler(DataContext dataContext,ITokenGenerator tokenGenerator,IHttpContextAccessor contextAccessor)
            {
                this.dataContext = dataContext;
                this.tokenGenerator = tokenGenerator;
                this.contextAccessor = contextAccessor;
            }
            public async Task<UserAdvertiseDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var ad = await RunAdvertiseQuery(request).AsNoTracking().FirstOrDefaultAsync();


                if (ad is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { Advertise = "Advertise is not found" });
                var token = contextAccessor.HttpContext.Request.Cookies["_aid"];
                if (token is null)
                    return ad;

                var userId = tokenGenerator.DecodeToken(token).Claims.FirstOrDefault(x => x.Type == "_cuser").Value;

              
                var userFav = await dataContext.UserFavorites.AsNoTracking()
                        .FirstOrDefaultAsync(x => x.Advertise.UniqueId == ad.Root.AdvertiseDTO.UniqueId
                                                                        && x.AppUserId == userId);
                ad.Root.IsFavorite = userFav is not null ? true : false;

                var userLike = await dataContext.UserLikes.AsNoTracking()
                             .FirstOrDefaultAsync(x => x.Advertise.UniqueId == ad.Root.AdvertiseDTO.UniqueId
                                                                             && x.AppUserId == userId);
                ad.Root.IsLiked = userLike is not null ? true : false;

                
                var likesCount = await dataContext.UserLikes.Where(x => x.Advertise.UniqueId == request.Id).AsNoTracking().CountAsync();
                ad.Root.Likes = likesCount;

                return ad;
            }

            private IQueryable<UserAdvertiseDTO> RunAdvertiseQuery(Query request)
            {
                return dataContext
                                    .UserAdvertise
                                    .Where(x => x.Advertise.UniqueId == request.Id)
                                    .Select(x => new UserAdvertiseDTO
                                    {
                                        Root = new Root
                                        {

                                            Status = x.Status,
                                            IsNegotiate = x.IsNegotiate,
                                            IsOnWarranty = x.IsOnWarranty,
                                            PaymentOption = x.PaymentOption,
                                            Category = x.Category,

                                            AdvertiseDTO = new AdvertiseDTO
                                            {

                                                Id = x.Advertise.Id,
                                                UniqueId = x.Advertise.UniqueId,
                                                City = x.Advertise.City,
                                                District = x.Advertise.District,
                                                PublishedAt = x.Advertise.PublishedAt,
                                                Price = x.Advertise.Price,
                                                Title = x.Advertise.Title,
                                                AdvertiseInfoDTO = new AdvertiseInfoDTO
                                                {
                                                    Color = x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Color,
                                                    Description = x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Description,
                                                    Hint = x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Hint,
                                                    Quantity = x.Advertise.AdvertiseInfo.Advertise.AdvertiseInfo.Quantity,
                                                }
                                            },
                                            User = new AdvertiseUser
                                            {
                                                FirstName = x.AppUser.FirstName,
                                                LastName = x.AppUser.LastName,
                                                UserName = x.AppUser.UserName,
                                            }
                                        }

                                    });
            }
        }
    }
}
