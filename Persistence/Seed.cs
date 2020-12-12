using Domain;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public async static Task AddData(UserManager<AppUser> userManager, RoleManager<Role> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                var roles = new List<Role>
                {
                    new Role{
                        Name="Admin"
                    },
                    new Role{
                        Name="Moderator"
                    },
                    new Role{
                        Name="Seller"
                    },
                    new Role{
                        Name="Normal"
                    },
                };
                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }

            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {

                    UserName = "test",
                    Email = "test@test.com",
                    FirstName = "Test",
                    LastName = "Test",


                };

                await userManager.CreateAsync(user, "password");

                await userManager.AddToRoleAsync(user, "Normal");
            }
        }
    }
}