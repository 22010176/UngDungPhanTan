namespace UserServices.Models;

public class User
{
  public Guid Id { get; set; } = Guid.NewGuid();
  public string Email { get; set; } = null!;
  public string MatKhau { get; set; } = null!;
  public string Root { get; set; } = null!;
}

public class UserInput
{
  public string Email { get; set; } = null!;
  public string MatKhau { get; set; } = null!;
}