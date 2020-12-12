using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class Role : IdentityRole
    {
        public ICollection<UserRoles> UserRoles { get; set; }
    }
}