using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace TestMakerFreeWebApp.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UploadViewModel
    {
        public int Id { get; set; }

        public IFormFile FormFile { get; set; }

        public string FileName { get; set; }

        public string Description { get; set; }

        public string MimeType { get; set; }

        public string Extension { get; set; }

        public string UserId { get; set; }

        [DefaultValue(0)]
        public int type { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime LastModifiedDate { get; set; }
    }
}
