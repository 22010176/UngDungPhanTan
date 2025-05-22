using Microsoft.EntityFrameworkCore;
using UserServices.Services;

namespace UserServices;

public class Startup(IConfiguration configuration)
{
  public IConfiguration Configuration { get; } = configuration;

  // This method gets called by the runtime. Use this method to add services to the container.
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddCors(options =>
      options.AddDefaultPolicy(builder =>
        builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

    services.AddControllers()
      .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

    services.AddAuthentication("MyCookieAuth")
      .AddCookie("MyCookieAuth", options =>
      {
        options.LoginPath = "/auth/login";
        options.AccessDeniedPath = "/auth/denied";
      });

    services.AddDbContext<AppDbContext>(options =>
    {
      options.UseNpgsql(Configuration.GetConnectionString("PostgresConnection"));
    });

    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
    services.AddSingleton<UserService>();
  }

  public void Configure(WebApplication app, IWebHostEnvironment env)
  {
    if (env.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
      app.UseSwagger();
      app.UseSwaggerUI();
    }

    app.UseCors();
    app.UseHttpsRedirection();

    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
  }
}