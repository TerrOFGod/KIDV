using AuthService.Commands.Commands;
using AuthService.Queries.Queries;
using Common.Auth.Extensions;
using Common.Core.Abstractions.Interfaces.Services;
using Common.CQRS.Extensions;
using Common.Messaging.RabbitMQ;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CQRS
builder.Services.AddCQRS(
    typeof(RegisterUserCommand), // Assembly marker для Commands
    typeof(GetUserProfileQuery)  // Assembly marker для Queries
);

// Add RabbitMQ
builder.Services.AddSingleton<IRabbitMQService, RabbitMQService>();

// Add JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();