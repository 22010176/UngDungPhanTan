using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using UserServices.Models;
using UserServices.Services;

namespace UserServices.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(AppDbContext context, UserService userService) : ControllerBase
{
  readonly AppDbContext _context = context;
  readonly UserService _userService = userService;

  [Authorize]
  [HttpGet]
  public async Task<ActionResult> Get()
  {
    string mail = User.FindFirst(ClaimTypes.Email)!.Value;
    User? user = await _context.Users.Where(u => u.Email == mail).FirstOrDefaultAsync();
    if (user is null)
    {
      await HttpContext.SignOutAsync("MyCookieAuth");
      return NotFound();
    }
    return Ok(new { user!.Id, user.Email, user.Root });
  }

  [HttpPost]
  public async Task<ActionResult> Post(UserInput input)
  {
    await _context.Users.AddAsync(new()
    {
      Email = input.Email,
      MatKhau = _userService.HashPassword(input.MatKhau),
      Root = Guid.NewGuid().ToString()
    });
    await _context.SaveChangesAsync();

    // Send request to Storage server

    return Ok(_context.Users.Where(u => u.Email == input.Email).FirstOrDefault());
  }

  [Authorize]
  [HttpPut]
  public async Task<ActionResult> Put(UserInput input)
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
      await HttpContext.SignOutAsync("MyCookieAuth");
      return NotFound();
    }

    _context.Users.Remove(user);
    _context.SaveChanges();

    return Ok();
  }
}
