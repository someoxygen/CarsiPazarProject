using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarsiPazarProjectAPI.Models
{
    public class UploadImageRequest
    {
        [FromForm]
        public IFormFile File { get; set; } = null!;
    }

}
