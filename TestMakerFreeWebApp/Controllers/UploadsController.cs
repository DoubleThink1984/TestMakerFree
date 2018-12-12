﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using TestMakerFreeWebApp.Controllers.Infrastructure.RoutingExtensions;
using TestMakerFreeWebApp.Data;
using TestMakerFreeWebApp.Data.Models;
using TestMakerFreeWebApp.Data.Validation;
using TestMakerFreeWebApp.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestMakerFreeWebApp.Controllers
{
    //[ModelStateInvalidActionFilter]
    public class UploadsController : BaseApiController
    {
        private IUrlHelper _urlHelper;

        public UploadsController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IUrlHelper urlHelper)
            : base(context, roleManager, userManager, configuration)
        {
            this._urlHelper = urlHelper;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var upload = DbContext.Uploads.Find(id);
            if (upload != null)
            {
                Stream stream = new MemoryStream(upload.File);
                //this.Response.ContentLength = upload.File.Length;
                Response.Headers.Add("Content-Disposition", $"attachment; filename={upload.FileName}");
                return File(stream, upload.MimeType);
            }
            return NotFound();
        }

        [HttpGet("GetFile/{num:int?}")]
        public IActionResult GetFile(int id)
        {
            var upload = DbContext.Uploads.Find(id);
            if (upload != null)
            {
                Stream stream = new MemoryStream(upload.File);
                Response.Headers.Add($"Content-Disposition", $"attachment; filename={upload.FileName}");
                return File(stream, upload.MimeType, upload.FileName);
            }
            return NotFound();
        }

        // POST api/<controller>
        // UploadViewModel has IFormFile property
        // Submitted as form data from client
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [ModelStateInvalidActionFilter]
        public IActionResult Post([FromForm]UploadViewModel uploadViewModel)
        {
            var file = uploadViewModel.File;
            if(file == null || file.Length == 0) return BadRequest();

            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                var fileContent = binaryReader.ReadBytes((int)file.Length);

                var upload = new Upload
                {
                    CreatedDate = DateTime.Now,
                    Description = uploadViewModel.Description,
                    Extension = Path.GetExtension(file.FileName),
                    File = fileContent,
                    FileName = Path.GetFileNameWithoutExtension(file.FileName),
                    LastModifiedDate = DateTime.Now,
                    MimeType = file.ContentType,
                    Type = 1,
                    UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value
                };

                DbContext.Uploads.Add(upload);
                // persist the changes into the Database.
                DbContext.SaveChanges();
                var uploadDto = upload.Adapt<UploadViewModel>();
                return CreatedAtAction(
                    nameof(Get), 
                    new { id = upload.Id }, 
                    CreateLinksForBooks(uploadDto));
            }
        }

        private UploadViewModel CreateLinksForBooks(UploadViewModel uploadDto)
        {
            uploadDto.Links.Add(
                new LinkDto(
                    _urlHelper.Action(nameof(Get), new { id = uploadDto.Id }),
                    "self", 
                    "GET"));

            uploadDto.Links.Add(
                new LinkDto(
                    _urlHelper.Action(nameof(Put), 
                    new { id = uploadDto.Id }), 
                    "update", "PUT"));

            uploadDto.Links.Add(
                new LinkDto(_urlHelper.Action(nameof(Delete), 
                new { id = uploadDto.Id }), 
                "delete", "DELETE"));

            return uploadDto;
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpPatch("{id}")]
        public IActionResult PartiallyUpdateUpload(int id, [FromBody] JsonPatchDocument<UploadViewModel> upload)
        {
            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }
            return NoContent();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        //public class GenerateAntiforgeryTokenCookieForAjaxAttribute : ActionFilterAttribute
        //{
        //    public override void OnActionExecuted(ActionExecutedContext context)
        //    {
        //        var antiforgery = context.HttpContext.RequestServices.GetService<IAntiforgery>();

        //        // We can send the request token as a JavaScript-readable cookie, 
        //        // and Angular will use it by default.
        //        var tokens = antiforgery.GetAndStoreTokens(context.HttpContext);
        //        context.HttpContext.Response.Cookies.Append(
        //            "XSRF-TOKEN",
        //            tokens.RequestToken,
        //            new CookieOptions() { HttpOnly = false });
        //    }
        //}
    }
}
