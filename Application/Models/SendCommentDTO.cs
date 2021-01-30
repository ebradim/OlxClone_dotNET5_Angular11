using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class SendCommentDTO
    {
        public string DisplayName { get; set; }
        public string Comment { get; set; }
        public DateTime CommentedAt { get; set; }
    }
}
