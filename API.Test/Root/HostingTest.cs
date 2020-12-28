using Application.Models;
using Application.RequestsHandler.User;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace API.Test.Root
{
    public abstract class HostingTest
    {
        protected HttpClient Client { get; private set; }
        protected HostingTest()
        {
            var factory = new WebApplicationFactory<Startup>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        services.RemoveAll(typeof(DataContext));
                        services.AddDbContext<DataContext>(options =>
                        {
                            options.UseNpgsql("Host=127.0.0.1;Port=5432;Database=OlxClone;Username=postgres;Password=ebrahim;");
                        });
                    });
                });
            Client = factory.CreateClient();
        }
        

    }
}
