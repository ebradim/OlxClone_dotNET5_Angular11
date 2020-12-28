using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Bio { get; set; }
        [Column(TypeName = "Date")]
        [DataType(DataType.Date)]
        public DateTime? Birthday { get; set; }

        public ICollection<UserRoles> UserRoles { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; }
        public ICollection<UserAdvertise> UserAdvertises { get; set; }
        public ICollection<UserAdvertiseFavorite> UserAdvertiseFavorites { get; set; }

 
    }
}