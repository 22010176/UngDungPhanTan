using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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
        builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials()));

    services.AddControllers()
      .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

    // services.AddAuthentication("MyCookieAuth")
    //   .AddCookie("MyCookieAuth", options =>
    //   {
    //     options.LoginPath = "/auth/login";
    //     options.AccessDeniedPath = "/auth/denied";
    //   });
    services.AddAuthentication("Bearer")
      .AddJwtBearer("Bearer", options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuer = false,
          // ValidIssuer = "AuthService",
          ValidateAudience = false,
          // ValidAudience = "UserService",
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("supersecretkey123456".PadRight(256))),
          ValidateLifetime = true
        };
      });
    services.AddAuthorization();
    services.AddDbContext<AppDbContext>(options =>
    {
      options.UseNpgsql(Configuration.GetConnectionString("PostgresConnection"));
    });

    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen(c =>
    {
      c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
      {
        Name = "Authorization", // Tên của header gửi token.
        Type = SecuritySchemeType.Http, // 
        Scheme = "Bearer", // Giao thức xác thực (Bearer Token).
        BearerFormat = "JWT", // Định dạng token.
        In = ParameterLocation.Header,
        Description = "Enter your JWT token in this format: Bearer {your token here}"
      });

      c.AddSecurityRequirement(new OpenApiSecurityRequirement
      {
        {
          new OpenApiSecurityScheme
          {
              Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
          },
          Array.Empty<string>()
        }
      });
    });
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