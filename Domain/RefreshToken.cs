using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }

        public string Token { get; set; }
        public DateTime ExpireAt { get; set; }
        public DateTime? RevokedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ReplacedByToken { get; set; }


        public string UserId { get; set; }
        public AppUser AppUser { get; set; }
        public bool IsExpire => DateTime.UtcNow >= ExpireAt;
        public bool IsActive => RevokedAt == null && !IsExpire;
        public bool IsAboutToExpire => (ExpireAt - DateTime.UtcNow ).TotalMinutes <= 20;


    }
}