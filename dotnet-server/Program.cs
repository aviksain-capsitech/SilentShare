using Microsoft.AspNetCore.Authentication.JwtBearer; 
using Microsoft.IdentityModel.Tokens; // TokenValidationParameters and SymmetricSecurityKey for validating JWT tokens.
using System.Text; // To encode the JWT tokens

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<MessageService>();
builder.Services.AddSingleton<JwtHelper>();

var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "your_super_secret_key_here"; // Reads the JWT secret from configuration or uses a fallback value.

builder.Services.AddAuthentication(options => // sets up JWT as the default authentication method for your app.
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => // To Configure the JWT Tokens
{
    // Extract JWT from Cookie
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (context.Request.Cookies.ContainsKey("accessToken"))
            {
                context.Token = context.Request.Cookies["accessToken"];
            }
            return Task.CompletedTask;
        }
    };

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false, // Don’t validate who issued the token
        ValidateAudience = false, // Don’t check which app the token was intended for
        ValidateLifetime = true, // Reject expired tokens
        ValidateIssuerSigningKey = true, // Ensure the token is signed with your secret key
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)), // The actual key used to validate the token's signature
        ClockSkew = TimeSpan.Zero // Removes buffer time (default is 5 mins). Forces strict expiration.
    };
});

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173") // Allow specific origin(s)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials(); // Required if you're sending cookies (like JWT in cookies)
        });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();
app.MapControllers();

app.MapGet("/", () => "This is My Home🏠🏠🏠 Route");

app.Run();





