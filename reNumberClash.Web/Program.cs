using Microsoft.EntityFrameworkCore;
using reNumberClash.Web.Models;
using Microsoft.AspNetCore.OpenApi;
using reNumberClash.Hubs;


DotNetEnv.Env.Load(); 
var builder = WebApplication.CreateBuilder(args);
var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));

var connectionString = "Host=ep-wandering-limit-a540fhht.us-east-2.aws.neon.tech;Database=renumberclash;Username=JunChoii;Password=axu0o4cZvnRq";

builder.Services.AddDbContext<DatabaseContext>(
    opt =>
    {
      opt.UseNpgsql(connectionString);
      if (builder.Environment.IsDevelopment())
      {
        opt
          .LogTo(Console.WriteLine, LogLevel.Information)
          .EnableSensitiveDataLogging()
          .EnableDetailedErrors();
      }
    }
);
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHub<GameHub>("/r/gamehub");

app.MapControllers();

// app.MapGet("/", () => "Hello World!");

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();
