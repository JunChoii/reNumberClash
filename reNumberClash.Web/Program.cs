using Microsoft.EntityFrameworkCore;
using reNumberClash.Web.Models;
using Microsoft.AspNetCore.OpenApi;
using reNumberClash.Hubs;


DotNetEnv.Env.Load(); 
var builder = WebApplication.CreateBuilder(args);
var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));

var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");

builder.Services.AddDbContext<DatabaseContext>(
    opt => {
        opt
        .UseMySql(connectionString, serverVersion);
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

app.MapGet("/", () => "Hello World!");

app.Run();
