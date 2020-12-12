using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class UserRoles : IdentityUserRole<string>
    {
        public AppUser AppUser { get; set; }
        public Role Role {get;set;}
    }
}