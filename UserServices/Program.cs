using UserServices;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
  Args = args,
  EnvironmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"
});

builder.Configuration
  .SetBasePath(Directory.GetCurrentDirectory())
  .AddJsonFile("appsettings.json", false, true)
  .AddEnvironmentVariables();

var startup = new Startup(builder.Configuration);
startup.ConfigureServices(builder.Services);

var app = builder.Build();
startup.Configure(app, builder.Environment);

app.Run();
