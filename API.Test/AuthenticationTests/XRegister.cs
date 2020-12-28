using API.Test.Root;
using Application.Models;
using Application.RequestsHandler.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace API.Test.AuthenticationTests
{
    public class XRegister : HostingTest
    {
        [Fact]
        public async Task OnRegister_Returns_Response_And_AuhtCookies()
        {
            var account = new Register.AccountRegister
            {
                FirstName ="XTestFirstName",
                LastName ="XTestLastName",
                UserName ="xUserName",
                Password="xpassword"
            };
            var response = await Client.PostAsJsonAsync(RootDomain.Url + UserRoutes.Register, account);
            var registerResponse = await response.Content.ReadFromJsonAsync<Register.AccountRegister>();
            
            Assert.Equal(expected: account.FirstName, actual: registerResponse.FirstName);
            
        }
    }
}
