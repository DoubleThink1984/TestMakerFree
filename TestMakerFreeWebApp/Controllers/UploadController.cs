using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TestMakerFreeWebApp.Data;
using TestMakerFreeWebApp.Data.Models;
using TestMakerFreeWebApp.ViewModels;

namespace TestMakerFreeWebApp.Controllers
{
    public class UploadController : BaseApiController
    {
        public UploadController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration
            )
            : base(context, roleManager, userManager, configuration) { }

        [Authorize]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Post()
        {
            try
            {
                var upload = new Upload();
                var file = Request.Form.Files[0];

                if (file.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        upload.File = ms.ToArray();
                        upload.FileName = file.Name;
                        upload.MimeType = file.ContentDisposition;
                    }                    
                }

                upload.CreatedDate = DateTime.Now;
                upload.LastModifiedDate = DateTime.Now;
                upload.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                DbContext.Uploads.Add(upload);
                DbContext.SaveChanges();

                return new JsonResult(upload.Adapt<UploadViewModel>(), JsonSettings);
                
            }
            catch (Exception ex)
            {
                return Json("Upload Failed" + ex.Message);
            }
        }
    }
}