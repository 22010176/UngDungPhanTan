using Microsoft.AspNetCore.Server.Kestrel.Core;
using StorageServices;

AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration);
// Add services to the container.
startup.ConfigureServices(builder.Services);
builder.WebHost.ConfigureKestrel(options =>
{
  // options.ListenLocalhost(5001, listenOptions =>
  // {
  //   listenOptions.Protocols = HttpProtocols.Http1;
  // });

  // options.ListenLocalhost(5002, listenOptions =>
  // {
  //   listenOptions.Protocols = HttpProtocols.Http2;
  // });
  // options.Limits.MinRequestBodyDataRate = new MinDataRate(bytesPerSecond: 2048, gracePeriod: TimeSpan.FromSeconds(10));
});
Console.WriteLine(builder.Configuration["JWT:JTW_SECRET"]);

var app = builder.Build();
startup.Configure(app, builder.Environment);

app.Run();
