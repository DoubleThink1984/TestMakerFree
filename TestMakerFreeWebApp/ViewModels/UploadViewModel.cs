using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TestMakerFreeWebApp.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UploadViewModel
    {
        public int Id { get; set; }

        public IFormFile File { get; set; }

        public string FileName { get; set; }

        public string Description { get; set; }

        //public int Type { get; set; }

        //[Required]
        //public string UserId { get; set; }
    }
}
