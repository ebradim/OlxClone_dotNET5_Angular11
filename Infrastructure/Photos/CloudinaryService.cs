using Application.Interfaces;
using Application.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Photos
{
    public class CloudinaryService : ICloudinaryService
    {
        public Cloudinary cloudinary { get; }

        public CloudinaryService(IOptions<CloudinarySettings> options)
        {

            var account = new Account(
                options.Value.CloudName,
                options.Value.API_KEY,
                options.Value.API_SECRET);

            cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> UploadPhoto(IFormFile file)
        {
            
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Crop("fill").Width("400").Height("500")
                
            };
            var uploadResult = await cloudinary.UploadAsync(uploadParams);
           
            return new PhotoUploadResult
            {
                Url = uploadResult.Url.AbsoluteUri,
                Id = uploadResult.PublicId
            };
        }

        public async Task<bool> DeletePhoto(string id)
        {
            var success = await cloudinary.DestroyAsync(new DeletionParams(id));
            return success.StatusCode == System.Net.HttpStatusCode.OK;
        }
    }
}
