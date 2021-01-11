using Application.Interfaces;
using Application.Models;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.UserAdvertises
{
    public class Create
    {
        public class Command : IRequest<UserAdvertiseDTO>
        {
            // Todo: add validations
            [Required]
            public bool IsNegotiate { get; set; }
            [Required]
            public bool IsOnWarranty { get; set; }
            [Required]
            public PaymentOption PaymentOption { get; set; }
            [Required]
            public string Title { get; set; }
            [Required]
            public string Category { get; set; }
            public string District { get; set; }
            [Required]
            public string City { get; set; }
            [Required]
            public double Price { get; set; }
            [Required]
            public AdvertiseInfoDTO AdvertiseInfo { get; set; }        
        }

        public class Handler : IRequestHandler<Command, UserAdvertiseDTO>
        {
            private readonly DataContext dataContext;
            private readonly ICurrentUser currentUser;

            public Handler(DataContext dataContext, ICurrentUser currentUser)
            {
                this.dataContext = dataContext;
                this.currentUser = currentUser;
            }

            public async Task<UserAdvertiseDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await dataContext.Users.FirstOrDefaultAsync(x => x.Id == currentUser.UserId);
                if (user is null)
                    throw new HttpContextException(HttpStatusCode.NotFound, new { User = "User is not found" });


                var advertise = new Advertise
                {
                    Title = request.Title,
                    District = request.District,
                    City = request.City,
                    Price = request.Price,
                    PublishedAt = DateTime.UtcNow,
                    AdvertiseInfo = new AdvertiseInfo
                    {
                        Color = request.AdvertiseInfo.Color,
                        Description = request.AdvertiseInfo.Description,
                        Hint = request.AdvertiseInfo.Hint,
                        Quantity = request.AdvertiseInfo.Quantity,
                     
                    },
                             
                };
                advertise.UniqueId = AdvertiseUniqueId.NewId(advertise.Title);
                var userAdvertise = new UserAdvertise
                {
                    Category=request.Category,
                    Status = Status.Pending,
                    IsNegotiate = request.IsNegotiate,
                    IsOnWarranty = request.IsOnWarranty,
                    PaymentOption = request.PaymentOption,
                    Advertise = advertise,
                    AppUser = user
                };

                await dataContext.UserAdvertise.AddAsync(userAdvertise);
                var success = await dataContext.SaveChangesAsync() > 0;
                if (success)
                    return new UserAdvertiseDTO(userAdvertise);
                throw new Exception("Server Error - creating new add");
            }
        }
    }
}
