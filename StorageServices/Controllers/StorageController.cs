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
  readonly ulong MaxSize = 5L * 1024L * 1024L * 1024L;
  [HttpGet]
  [Authorize]
  public async Task<ActionResult<ICollection>> GetFiles()
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Unauthorized();

    return Ok(await _minioService.GetListObjects(root));
  }

  [HttpGet("{*path}")]
  [Authorize]
  public async Task<ActionResult<ICollection>> GetFiles(string path = "")
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Unauthorized();

    return Ok(await _minioService.GetListObjects(string.Join("/", new List<string>() { root, path })));
  }

  [HttpPost]
  [Authorize]
  [Consumes("multipart/form-data")]
  public async Task<ActionResult> Upload([FromForm] FileInputForm form)
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Unauthorized();

    Console.WriteLine(string.Join("/", [root, form.Path]));

    bool result = await _minioService.InsertObject(form.File, form.Path == "." ? root : string.Join("/", [root, form.Path]));

    if (!result) return BadRequest();
    return Ok();
  }

  [HttpDelete]
  [Authorize]
  [Consumes("multipart/form-data")]
  public async Task<ActionResult> Delete(string path)
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Unauthorized();

    bool result = await _minioService.DeleteObject(path);

    if (!result) return BadRequest();
    return Ok(path);
  }

  [HttpGet("quota")]
  [Authorize]
  public async Task<ActionResult> GetSizeUsed()
  {
    var root = User.FindFirst("Root")?.Value;
    if (string.IsNullOrEmpty(root)) return Unauthorized();
    ulong result = await _minioService.GetFileSize(root);

    return Ok(new
    {
      Current = result,
      TotalSize = MaxSize
    });
  }

}

public class FileInputForm
{
  [FromForm(Name = "file")]
  public IFormFile File { get; set; } = null!;

  [FromForm(Name = "path")]
  public string Path { get; set; } = null!;
}