using Microsoft.AspNetCore.Authorization;

namespace API.AuthPolicy.Requirements
{
    public class IsAdvertiseInFavoritesRequirement : IAuthorizationRequirement
    {
        public FavoriteRequirement FavoriteRequirement { get; set; }

        public IsAdvertiseInFavoritesRequirement(FavoriteRequirement favoriteRequirement)
        {
            FavoriteRequirement = favoriteRequirement;
        }
    }
    public enum FavoriteRequirement {Adding=0,Removing=1}
}