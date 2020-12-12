using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, Role, string, IdentityUserClaim<string>, UserRoles, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {

        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<UserRoles>(opt =>
            {
                opt.HasKey(x => new { x.RoleId, x.UserId });

                opt.HasOne(x => x.Role)
                    .WithMany(x => x.UserRoles)
                    .HasForeignKey(x => x.RoleId)
                    .IsRequired();

                opt.HasOne(x => x.AppUser)
                    .WithMany(x => x.UserRoles)
                    .HasForeignKey(x => x.UserId)
                    .IsRequired();

            });


            builder.Entity<RefreshToken>(opt =>
            {

                opt.HasOne(x => x.AppUser)
                    .WithMany(x => x.RefreshTokens)
                    .HasForeignKey(x => x.UserId);

                opt.HasIndex(x => x.Token);

            });
        }

    }
}