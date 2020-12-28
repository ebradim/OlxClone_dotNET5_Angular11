using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Test.Root
{
   
    public  class RootDomain
    {
        public static string Url => "http://localhost:5000/api";

    }
    public class UserRoutes
    {
        public static string Register => "/user/register";
        public static string Login => "/user/login";

    }
}
