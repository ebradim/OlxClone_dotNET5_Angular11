using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Threading.Tasks;

namespace Persistence
{
    public static class RedisHelper
    {
        public async static Task SetRefreshToken(this IDistributedCache cache,string key, string value)
        {
            var confing = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(2),
                SlidingExpiration = null
            };
            await cache.SetStringAsync(key, value,confing);
        }


        public async static Task<string> GetRefreshToken(this IDistributedCache cache, string key)
        {
            
            return await cache.GetStringAsync(key);
        }

    }
}
