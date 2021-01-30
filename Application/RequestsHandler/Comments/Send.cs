using Application.Interfaces;
using Application.Models;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using ProjectML.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RequestsHandler.Comments
{
    public class Send
    {
        public class Command : IRequest<SendCommentDTO>
        {
            public string AdvertiseId { get; set; }

            public string Comment { get; set; }
        }

        public class Handler : IRequestHandler<Command, SendCommentDTO>
        {
            private readonly DataContext dataContext;
            private readonly ICurrentUser currentUser;

            public Handler(DataContext dataContext, ICurrentUser currentUser)
            {
                this.dataContext = dataContext;
                this.currentUser = currentUser;
            }
            public async Task<SendCommentDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var sender = await dataContext.Users.FirstOrDefaultAsync(x => x.Id == currentUser.UserId);
                if (sender is null)
                    throw new HttpContextException(HttpStatusCode.NotFound, new { User = "User is not found" });

                var advertise = await dataContext.Advertise.Where(x => x.UniqueId == request.AdvertiseId)
                    .FirstOrDefaultAsync();

                ModelInput sampleData = new ModelInput()
                {
                    Comment = request.Comment,
                };

                // Make a single prediction on the sample data and print results
                var predictionResult = ConsumeModel.Predict(sampleData);


                var userComment = new UserComments
                {
                    Advertise = advertise,
                    Commenter = sender,
                    CommentedAt = DateTime.UtcNow,
                    Comment = request.Comment,
                    PositiveAccuracy = predictionResult.Score[0],
                    NegativeAccuracy = predictionResult.Score[1]
                };
                await dataContext.UserComments.AddAsync(userComment);

                var success = await dataContext.SaveChangesAsync() > 0;
                if (success)
                {
                    return new SendCommentDTO
                    {
                       Comment = userComment.Comment,
                       CommentedAt = userComment.CommentedAt,
                       DisplayName = $"{userComment.Commenter.FirstName} {userComment.Commenter.LastName}"
                    };
                }
                else
                {
                    throw new Exception("ERROR WHILE SENDING Comment");
                }
            }
        }
    }
}
