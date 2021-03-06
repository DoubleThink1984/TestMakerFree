﻿using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TestMakerFreeWebApp.ViewModels;
using System.Collections.Generic;
using System.Linq;
using TestMakerFreeWebApp.Data;
using Mapster;
using TestMakerFreeWebApp.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace TestMakerFreeWebApp.Controllers
{
    public class AnswerController : BaseApiController
    {
        #region Constructor
        public AnswerController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
            : base(context, roleManager, userManager, configuration) { }
        #endregion

        #region RESTful conventions methods
        /// <summary>
        /// Retrieves the Answer with the given {id}
        /// </summary>
        /// <param name="id">The ID of an existing Answer</param>
        /// <returns>the Answer with the given {id}</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var answer = DbContext.Answers
                .FirstOrDefault(i => i.Id == id);

            // handle requests asking for non-existing quizzes
            if (answer == null) return NotFound(new
            {
                Error = string.Format("Answer ID {0} has not been found", id)
            });

            return new JsonResult(
                answer.Adapt<AnswerViewModel>(),
                JsonSettings);
        }

        /// <summary>
        /// Adds a new Answer to the Database
        /// </summary>
        /// <param name="model">The AnswerViewModel containing the data to insert</param>
        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody]AnswerViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null) return new StatusCodeResult(500);

            // map the ViewModel to the Model
            var answer = model.Adapt<Answer>();

            // override those properties 
            //   that should be set from the server-side only
            answer.CreatedDate = DateTime.Now;
            answer.LastModifiedDate = answer.CreatedDate;

            // add the new answer
            DbContext.Answers.Add(answer);
            // persist the changes into the Database.
            DbContext.SaveChanges();

            // return the newly-created Answer to the client.
            return new JsonResult(answer.Adapt<AnswerViewModel>()
                , JsonSettings);
        }

        /// <summary>
        /// Edit the Answer with the given {id}
        /// </summary>
        /// <param name="model">The AnswerViewModel containing the data to update</param>
        [Authorize]
        [HttpPut]
        public IActionResult Put([FromBody]AnswerViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null) return new StatusCodeResult(500);

            // retrieve the answer to edit
            var answer = DbContext.Answers.FirstOrDefault(q => q.Id ==
                                                               model.Id);

            // handle requests asking for non-existing quizzes
            if (answer == null) return NotFound(new
            {
                Error = string.Format("Answer ID {0} has not been found", model.Id)
            });

            // handle the update (without object-mapping)
            //   by manually assigning the properties 
            //   we want to accept from the request
            answer.QuestionId = model.QuestionId;
            answer.Text = model.Text;
            answer.Value = model.Value;
            answer.Notes = model.Notes;

            // properties set from server-side
            answer.LastModifiedDate = answer.CreatedDate;

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // return the updated Quiz to the client.
            return new JsonResult(answer.Adapt<AnswerViewModel>()
                , JsonSettings);
        }

        /// <summary>
        /// Deletes the Answer with the given {id} from the Database
        /// </summary>
        /// <param name="id">The ID of an existing Answer</param>
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // retrieve the answer from the Database
            var answer = DbContext.Answers
                .FirstOrDefault(i => i.Id == id);

            // handle requests asking for non-existing answers
            if (answer == null) return NotFound(new
            {
                Error = string.Format("Answer ID {0} has not been found", id)
            });

            // remove the quiz from the DbContext.
            DbContext.Answers.Remove(answer);
            // persist the changes into the Database.
            DbContext.SaveChanges();

            // return an HTTP Status 200 (OK).
            //return new OkResult();
            return new NoContentResult();
        }
        #endregion

        // GET api/answer/all
        [HttpGet("All/{questionId}")]
        public IActionResult All(int questionId)
        {
            var answers = DbContext.Answers
                .Where(q => q.QuestionId == questionId)
                .ToArray();
            return new JsonResult(
                answers.Adapt<AnswerViewModel[]>(),
                JsonSettings);
        }
    }
}
