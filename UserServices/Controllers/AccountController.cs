using System.Security.Claims;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserServices.Grpc;
using UserServices.Models;
using UserServices.Services;

namespace UserServices.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(AppDbContext context, UserService userService, Storage.StorageClient storageClient) : ControllerBase
{
  readonly AppDbContext _context = context;
  readonly UserService _userService = userService;
  readonly Storage.StorageClient _storageClient = storageClient;

  [Authorize]
  [HttpGet]
  public async Task<ActionResult> Get()
  {
    string mail = User.FindFirst(ClaimTypes.Email)!.Value;
    User? user = await _context.Users.Where(u => u.Email == mail).FirstOrDefaultAsync();
    if (user is null)
    {
      // await HttpContext.SignOutAsync("MyCookieAuth");
      return Unauthorized();
    }
    return Ok(new { user!.Id, user.Email, user.Root });
  }

  [HttpPost]
  public async Task<ActionResult> Post(UserInput input)
  {
    User user = new()
    {
      FirstName = input.FirstName,
      LastName = input.LastName,
      Email = input.Email,
      HashedPassword = _userService.HashPassword(input.Password),
      Root = Guid.NewGuid().ToString()
    };
    await _context.Users.AddAsync(user);
    await _context.SaveChangesAsync();
    // try
    // {
    //   var reply = await _storageClient.InitUserStorageAsync(new InitUserStorageRequest { BucketId = user.Root });
    //   Console.WriteLine(reply.Status);
    // }
    // catch (System.Exception)
    // {
    //   throw;
    // }
    // Send request to Storage server

    return Ok(_context.Users.Where(u => u.Email == input.Email).FirstOrDefault());
  }

  [Authorize]
  [HttpPut]
  public ActionResult Put(UserInput input)
  {

    return Ok();
  }

  [Authorize]
  [HttpDelete]
  public async Task<ActionResult> Delete()
  {
    string mail = User.FindFirst(ClaimTypes.Email)!.Value;
    User? user = await _context.Users.Where(u => u.Email == mail).FirstOrDefaultAsync()!;
    if (user == null)
    {
      // await HttpContext.SignOutAsync("MyCookieAuth");
      return Unauthorized();
    }

    _context.Users.Remove(user);
    _context.SaveChanges();

    return Ok();
  }
}
