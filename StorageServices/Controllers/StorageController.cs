using System.Collections;
using Microsoft.AspNetCore.Mvc;
using StorageServices.Services;

namespace StorageServices.Controllers;

[ApiController]
[Route("[controller]")]
public class StorageController(MinioService minioService) : ControllerBase
{
  readonly MinioService _minioService = minioService;

  [HttpGet]
  public async Task<ActionResult<ICollection>> GetFiles(string path)
  {
    return Ok(await _minioService.GetListObjects(path));
  }
}