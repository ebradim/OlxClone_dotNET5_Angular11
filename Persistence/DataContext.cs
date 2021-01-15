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
        public DbSet<Advertise> Advertise { get; set; }
        public DbSet<AdvertiseInfo> AdvertiseInfo { get; set; }
        public DbSet<UserAdvertise> UserAdvertise { get; set; }
        public DbSet<UserFavorite> UserFavorites { get; set; }
        public DbSet<UserLike> UserLikes { get; set; }
        public DbSet<UserOffer> UserOffers { get; set; }

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

            builder.Entity<UserAdvertise>(opt =>
            {

                opt.HasKey(x => new { x.AdvertiseId, x.AppUserId });

                opt.HasOne(x => x.Advertise)
                    .WithMany(x => x.UserAdvertises)
                    .HasForeignKey(x => x.AdvertiseId);

                opt.HasOne(x => x.AppUser)
                  .WithMany(x => x.UserAdvertises)
                  .HasForeignKey(x => x.AppUserId);

            });
            builder.Entity<UserFavorite>(opt =>
            {

                opt.HasKey(x => new { x.AdvertiseId, x.AppUserId });

                opt.HasOne(x => x.Advertise)
                    .WithMany(x => x.UserFavorites)
                    .HasForeignKey(x => x.AdvertiseId);

                opt.HasOne(x => x.AppUser)
                  .WithMany(x => x.UserFavorites)
                  .HasForeignKey(x => x.AppUserId);

            });
            builder.Entity<UserLike>(opt =>
            {
                opt.HasKey(x => new { x.AdvertiseId, x.AppUserId });

                opt.HasOne(x => x.Advertise)
                    .WithMany(x => x.UserLikes)
                    .HasForeignKey(x => x.AdvertiseId);

                opt.HasOne(x => x.AppUser)
                  .WithMany(x => x.UserLikes)
                  .HasForeignKey(x => x.AppUserId);
                
            });

      

            builder.Entity<Advertise>(opt =>
            {
                opt.HasIndex(x => x.UniqueId);

                opt.HasOne(x => x.AdvertiseInfo)
                    .WithOne(x => x.Advertise)
                    .HasForeignKey<AdvertiseInfo>(x => x.AdvertiseId);
        

            });


    
            builder.Entity<AdvertiseInfo>(opt =>
            {
                opt.HasIndex(x => new { x.Id,x.AdvertiseId});


            });


            builder.Entity<UserOffer>(opt =>
            {
                opt.HasKey(x => x.Id);

                opt.HasOne(x => x.Sender)
                    .WithMany(x => x.SentOffers)
                    .HasForeignKey(x => x.SenderId);

                opt.HasOne(x => x.Receiver)
                    .WithMany(x => x.ReceivedOffers)
                    .HasForeignKey(x => x.ReceiverId);

                opt.HasIndex(x => new { x.SenderId, x.ReceiverId });
            });
        
          
        }

    }
}