using Application.Interfaces;
using System;
using System.Text;

namespace Infrastructure.Tokens
{
    public class RefreshTokenGenerator : IRefreshTokenGenerator
    {
        public string Generate(string userName = null)
        {
            var firstToken = $"{Guid.NewGuid()}-{DateTime.UtcNow}";
            var firstPart = Convert.ToBase64String(Encoding.UTF8.GetBytes(firstToken));

            return firstPart + Guid.NewGuid().ToString() + "-" + Convert.ToBase64String(Encoding.UTF8.GetBytes(userName));
        }
    }
}
