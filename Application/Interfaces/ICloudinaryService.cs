using Application.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICloudinaryService
    {
        public Task<PhotoUploadResult> UploadPhoto(IFormFile file);
        public Task<bool> DeletePhoto(string id);
    }
}
