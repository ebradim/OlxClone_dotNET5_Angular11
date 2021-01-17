using API.AuthPolicy;
using API.AuthPolicy.Handler;
using API.AuthPolicy.Requirements;
using API.Hubs;
using API.Middlewares;

using API.Services;
using Application.CQRS;
using Application.Interfaces;
using Application.RequestsHandler.User;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Tokens;
using Infrastructure.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

   
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddUserIdentity();
            services.AddPostgreSQL(Configuration);
            services.AddMediatR(typeof(ReadUsers.Handler).Assembly);
            services.AddJwtAuth(Configuration);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                c.CustomSchemaIds(x => x.FullName);
            });
            services.AddAntiforgery(options => 
            {
                options.HeaderName = "X-Token";
                options.SuppressXFrameOptionsHeader = false;
            });

            services.AddControllers().AddNewtonsoftJson(options=>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.AddMvc(options=>{
                options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
                var authorizedPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(authorizedPolicy));
            })
                    .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Register>());
            services.AddCors(options=>{
                options.AddPolicy("OlxPolicy",policy=>{
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200").AllowCredentials();
                });
            });
            services.AddAuthorization(options =>
            {
                Helper.AddCustomPolicies(options);
            });
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = Configuration.GetConnectionString("redis");
                options.InstanceName = "OlxClone-";
            });

            services.AddHttpContextAccessor();
            services.AddSignalR();
            services.AddScoped<ICurrentUser, CurrentUser>();
            services.AddScoped<ITokenGenerator, TokenGenerator>();
            services.AddScoped<IAuthCookies, AuthCookies>();
            services.AddScoped<IRefreshTokenGenerator, RefreshTokenGenerator>();
            services.AddScoped<ICloudinaryService, CloudinaryService>();
            services.AddTransient<IAuthorizationHandler, AdvertiseOwnerHandler>();
            services.AddTransient<IAuthorizationHandler, IsAdvertiseInFavoritesHandler>();
            services.AddTransient<IAuthorizationHandler, IAdvertiseInUserLikesHandler>();
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
            services.AddSingleton<IUserIdProvider, UserNameBasedId>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("OlxPolicy");
            app.UseMiddleware<ErrorHandlingMiddleware>();

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            // app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<OfferHub>("/offerhub");
            });
        }
    }
}
