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

  [HttpPut]
  [Authorize]
  public async Task<ActionResult> RenameFolder(UpdateFolderInput input)
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Unauthorized();


    return Ok(input);
  }

  [HttpDelete]
  [Authorize]
  public async Task<ActionResult> DeleteFolder(string path)
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Unauthorized();

    string deletePath = path.Contains(root) ? path : string.Join('/', [root, path]);
    Console.WriteLine(deletePath);
    await minioService.DeleteFolder(deletePath);

    return Ok(path);
  }
}

public class DirectoryInput
{
  public string Path { get; set; } = null!;
}

public class UpdateFolderInput
{
  public string OldPath { get; set; } = null!;
  public string NewPath { get; set; } = null!;
}