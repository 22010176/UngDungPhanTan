using StorageServices.Services;
namespace StorageServices;

public class Startup(IConfiguration configuration)
{
  public IConfiguration Configuration = configuration;

  public async Task InitMinio(IServiceCollection services)
  {
    services.AddScoped<MinioService>();
  }

  public async Task ConfigureServices(IServiceCollection services)
  {
    services.AddCors(options =>
    {
      options.AddDefaultPolicy(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
    });
    services.AddControllers();
    services.AddGrpc().AddJsonTranscoding();
    services.AddGrpcSwagger();
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen(c =>
    {
      var filePath = Path.Combine(AppContext.BaseDirectory, "StorageServices.xml");
      c.IncludeXmlComments(filePath);
      c.IncludeGrpcXmlComments(filePath, includeControllerXmlComments: true);
    });

    await InitMinio(services);
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
    app.MapControllers();
    app.MapGrpcService<GreeterService>();
    app.MapGrpcService<StorageService>();
  }
}