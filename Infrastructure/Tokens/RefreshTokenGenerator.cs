using Application.Interfaces;
using System;
using System.Text;

namespace Infrastructure.Tokens
{
    public class RefreshTokenGenerator : IRefreshTokenGenerator
    {
        public string Generate(string userName = null)
        {
            var token = $"{Guid.NewGuid()} {Guid.NewGuid()} {userName}";
            var encoded = Encoding.UTF8.GetBytes(token);
            return Convert.ToBase64String(encoded);
        }
    }
}
