using Microsoft.AspNetCore.Identity;

namespace UserServices.Services;

public class UserService
{
  private readonly PasswordHasher<object> _passwordHasher = new();

  public string HashPassword(string password) =>
     _passwordHasher.HashPassword(null, password);

  public bool VerifyPassword(string hashedPassword, string providedPassword)
  {
    var result = _passwordHasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
    return result == PasswordVerificationResult.Success;
  }
}