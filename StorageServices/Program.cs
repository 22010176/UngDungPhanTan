using StorageServices;

var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration);
// Add services to the container.
await startup.ConfigureServices(builder.Services);

var app = builder.Build();
startup.Configure(app, builder.Environment);

app.Run();
