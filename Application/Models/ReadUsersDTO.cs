using Newtonsoft.Json;

namespace Application.Models
{
    public class ReadUsersDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        [JsonProperty("email")]
        public Test Test { get; set; }

    }
    public class Test
    {

        public string Email { get; set; }
    }
}