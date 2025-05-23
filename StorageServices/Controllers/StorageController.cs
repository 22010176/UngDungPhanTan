using System.Collections;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorageServices.Services;

namespace StorageServices.Controllers;

[ApiController]
[Route("[controller]")]
public class StorageController(MinioService minioService) : ControllerBase
{
  readonly MinioService _minioService = minioService;

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<ICollection>> GetFiles()
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Ok(new List<string>() { });

    return Ok(await _minioService.GetListObjects(root));
  }
}