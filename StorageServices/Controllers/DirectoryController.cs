using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorageServices.Services;

namespace StorageServices.Controllers;

[ApiController]
[Route("[controller]")]
public class DirectoryController(MinioService service) : ControllerBase
{
  readonly MinioService minioService = service;

  [HttpPost]
  [Authorize]
  public async Task<ActionResult> CreateDirectory(DirectoryInput path)
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Unauthorized();

    bool result = await minioService.CreateFolder(string.Join('/', [root, path.Path]));
    if (!result) return BadRequest();
    return Created();
  }
}

public class DirectoryInput
{
  public string Path { get; set; } = null!;
}