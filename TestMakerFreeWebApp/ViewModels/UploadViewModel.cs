using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using TestMakerFreeWebApp.Data.Models;

namespace TestMakerFreeWebApp.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UploadViewModel : LinkedResourceBaseDto
    {
        public int Id { get; set; }

        public IFormFile File { get; set; }

        public string FileName { get; set; }

        [Required]
        public string Description { get; set; }

        //public int Type { get; set; }

        //[Required]
        //public string UserId { get; set; }
    }
}
