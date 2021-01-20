using Application.Interfaces;
using Application.Models;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.UserAdvertises
{
    public class Edit
    {

        public class Command : IRequest<UserAdvertiseDTO>
        {
            // Todo: add validations
            public ICollection<IFormFile> Photos { get; set; }
            public ICollection<string> DeletingImages { get; set; }
            public string UniqueId { get; set; }
            public bool IsNegotiate { get; set; }
            public bool IsOnWarranty { get; set; }
            public Status Status { get; set; }
            public PaymentOption PaymentOption { get; set; }
            public string Category{get;set;}
            public string District { get; set; }
            public string City { get; set; }
            public double Price { get; set; }
            public AdvertiseInfoDTO AdvertiseInfo { get; set; }
        }

        public class Handler : IRequestHandler<Command, UserAdvertiseDTO>
        {
            private readonly DataContext dataContext;
            private readonly ICurrentUser current;
            private readonly ICloudinaryService cloudinary;

            public Handler(DataContext dataContext,ICurrentUser current,ICloudinaryService cloudinary)
            {
                this.dataContext = dataContext;
                this.current = current;
                this.cloudinary = cloudinary;
            }
            
            public async Task<UserAdvertiseDTO> Handle(Command request, CancellationToken cancellationToken)
            {

                var ad = await dataContext.UserAdvertise
                .Include(x=>x.Advertise)
                .ThenInclude(x=>x.AdvertiseInfo)
                .Include(x=>x.AdvertisePhotos)
                .FirstOrDefaultAsync(x => x.Advertise.UniqueId == request.UniqueId);
                if (ad is null)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { Advertise = "Advertise is not found" });
                if(ad.AppUserId != current.UserId)
                    throw new HttpContextException(System.Net.HttpStatusCode.NotFound, new { User = "User is not the owner" });

                var user = await dataContext.Users
                .Select(x=>new {x.Id, x.FirstName, x.LastName,x.UserName})
                .AsNoTracking().FirstOrDefaultAsync(x=>x.Id ==ad.AppUserId);

                if (request.DeletingImages is not null && request.DeletingImages.Count > 0)
                {
                    foreach (var item in request.DeletingImages)
                    {
                        await cloudinary.DeletePhoto(item);
                        var photo= ad.AdvertisePhotos.FirstOrDefault(x => x.Id == item);
                        dataContext.Photos.Remove(photo);
                    }
                }
                var photos = new List<Photo>();
                if (request.Photos is not null && request.Photos.Count > 0)
                {

                    foreach (var photo in request.Photos)
                    {
                        var result = await cloudinary.UploadPhoto(photo);

                        photos.Add(new Photo
                        {
                            Id = result.Id,
                            Url = result.Url
                        });
                    }
                }
                ad.Category = request.Category ?? ad.Category;
                ad.Status = request.Status;
                ad.IsNegotiate = request.IsNegotiate;
                ad.IsOnWarranty = request.IsOnWarranty;
                ad.PaymentOption = request.PaymentOption;
                ad.AdvertisePhotos = photos;
                ad.Advertise.District = request.District ?? ad.Advertise.District;
                ad.Advertise.City = request.City ?? ad.Advertise.City;
                ad.Advertise.Price = request.Price;
                ad.Advertise.AdvertiseInfo.Color = request.AdvertiseInfo.Color ?? ad.Advertise.AdvertiseInfo.Color;
                ad.Advertise.AdvertiseInfo.Description = request.AdvertiseInfo.Description ?? ad.Advertise.AdvertiseInfo.Description;
                ad.Advertise.AdvertiseInfo.Hint = request.AdvertiseInfo.Hint ?? ad.Advertise.AdvertiseInfo.Hint;
                ad.Advertise.AdvertiseInfo.Quantity = request.AdvertiseInfo.Quantity;
                var adUser = new AppUser{
                                FirstName=user.FirstName,
                                LastName = user.LastName,
                                UserName = user.UserName
                            };
               
                var success = await dataContext.SaveChangesAsync() > 0;
                if (success)
                    ad.AppUser = adUser;
                    return new UserAdvertiseDTO(ad);
                throw new Exception("Server Error - Details");
            }
        }
    }
}
