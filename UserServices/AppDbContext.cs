using Microsoft.EntityFrameworkCore;
using UserServices.Models;

namespace UserServices;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public DbSet<User> Users { get; set; }
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<User>().HasIndex(b => b.Email).IsUnique();
    modelBuilder.Entity<User>().HasIndex(b => b.Root).IsUnique();

    base.OnModelCreating(modelBuilder);
  }
}


