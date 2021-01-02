using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public async static Task AddData(DataContext dataContext,UserManager<AppUser> userManager, RoleManager<Role> roleManager)
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


            if (!dataContext.UserAdvertise.Any())
            {
                var userAd = new UserAdvertise
                {
                    Advertise = new Advertise
                    {
                        Title = "Dell laptop with 16GB ram",
                        City = "Cairo",
                        District = "Somewhere",
                        PublishedAt = DateTime.UtcNow,
                        Price= 20.50,
                        AdvertiseInfo = new AdvertiseInfo
                        {
                            Color ="Black",
                            Description="Very long description",
                            Hint="short info",
                            Quantity = 2
                        },                      
                    },
                    AppUser = await dataContext.Users.FirstOrDefaultAsync(x => x.UserName == "test"),
                    Status = Status.Pending,
                    IsNegotiate = true,
                    IsOnWarranty = true,
                    PaymentOption = PaymentOption.Cash,
                    
                };

                userAd.Advertise.UniqueId = AdvertiseUniqueId.NewId(userAd.Advertise.Title);
                await dataContext.UserAdvertise.AddAsync(userAd);
         
                await dataContext.SaveChangesAsync();
            }
        }
    }
}