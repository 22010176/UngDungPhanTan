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
public class AuthController(AppDbContext context, UserService userService) : ControllerBase
{
  readonly AppDbContext _context = context;
  readonly UserService _service = userService;

  [HttpPost("/auth/login")]
  public async Task<IActionResult> Login(string mail, string matKhau)
  {
    User? user = await _context.Users.Where(i => i.Email == mail).FirstOrDefaultAsync();
    if (user is null || !_service.VerifyPassword(user.MatKhau, matKhau)) return Unauthorized();

    List<Claim> claims = [
      new(ClaimTypes.Email, user.Email),
      new("Root", user.Root)
    ];
    var principal = new ClaimsPrincipal(new ClaimsIdentity(claims, "MyCookieAuth"));
    await HttpContext.SignInAsync("MyCookieAuth", principal);

    return Ok(new { Message = "Login!" });
  }

  [Authorize]
  [HttpPost("logout")]
  public async Task<IActionResult> Logout()
  {
    await HttpContext.SignOutAsync("MyCookieAuth");
    return Ok("Đăng xuất thành công");
  }

  [Authorize]
  [HttpGet("protected")]
  public IActionResult Protected()
  {
    var user = User.FindFirst(ClaimTypes.Name);
    return Ok($"Bạn đang đăng nhập dưới tài khoản: {user}");
  }
}