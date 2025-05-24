using System.Text;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StorageServices.Services;

namespace StorageServices;

public class Startup(IConfiguration configuration)
{
  public IConfiguration Configuration = configuration;

  private static void InitAuthenticate(IServiceCollection services)
  {
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
  }

  private static void InitSwagger(IServiceCollection services)
  {
    services.AddGrpcSwagger();
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen(c =>
    {
      var filePath = Path.Combine(AppContext.BaseDirectory, "StorageServices.xml");
      c.IncludeXmlComments(filePath);
      c.IncludeGrpcXmlComments(filePath, includeControllerXmlComments: true);

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
          { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
          Array.Empty<string>()
        }
      });
    });
  }

  public void ConfigureServices(IServiceCollection services)
  {
    services.AddCors(options =>
    {
      options.AddDefaultPolicy(builder =>
        builder
          .AllowCredentials()
          .AllowAnyHeader()
          .AllowAnyMethod()
          .SetIsOriginAllowed(i => true));
    });
    services.AddControllers();
    services.AddGrpc().AddJsonTranscoding();
    services.AddScoped<MinioService>();
    services.Configure<FormOptions>(options =>
    {
      options.MultipartBodyLengthLimit = int.MaxValue;
    });
    InitSwagger(services);
    InitAuthenticate(services);
  }

  public void Configure(WebApplication app, IWebHostEnvironment env)
  {
    app.UseSwagger();
    if (env.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
      app.UseSwaggerUI();
    }
    app.UseCors();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapGrpcService<GreeterService>();
    app.MapGrpcService<StorageService>();
    app.MapControllers();
  }
}