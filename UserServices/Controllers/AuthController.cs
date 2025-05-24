using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using UserServices.Models;
using UserServices.Services;

namespace UserServices.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(AppDbContext context, UserService userService) : ControllerBase
{
  readonly AppDbContext _context = context;
  readonly UserService _service = userService;

  [HttpPost("login")]
  public async Task<IActionResult> Login(string mail, string password)
  {
    User? user = await _context.Users.Where(i => i.Email == mail).FirstOrDefaultAsync();
    if (user is null || !_service.VerifyPassword(user.HashedPassword, password)) return Unauthorized();

    List<Claim> claims = [
      new(ClaimTypes.Email, user.Email),
      new("Root", user.Root)
    ];

    // var principal = new ClaimsPrincipal(new ClaimsIdentity(claims, "MyCookieAuth"));
    // await HttpContext.SignInAsync("MyCookieAuth", principal);

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("supersecretkey123456".PadRight(256)));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
      claims: claims,
      expires: DateTime.Now.AddMinutes(300),
      signingCredentials: creds
    );

    var jwt = new JwtSecurityTokenHandler().WriteToken(token);
    return Ok(new { Message = "Login!", Token = jwt });
  }

  [Authorize]
  [HttpPost("logout")]
  public async Task<IActionResult> Logout()
  {
    await HttpContext.SignOutAsync("MyCookieAuth");
    return Ok("Đăng xuất thành công");
  }

  [Authorize]
  [HttpGet("validate")]
  public IActionResult Validate()
  {
    var user = User.FindFirst(ClaimTypes.Name);
    return Ok($"Bạn đang đăng nhập dưới tài khoản: {user}");
  }
}