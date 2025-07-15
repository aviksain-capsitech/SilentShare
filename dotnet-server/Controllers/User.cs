using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SilentShare.Controllers;

[ApiController]
[Route("Api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    private readonly JwtHelper _jwtHelper;

    private readonly ILogger<MessageController> _logger;

    public UserController(ILogger<MessageController> logger, UserService userService, JwtHelper jwtHelper)
    {
        _logger = logger;
        _userService = userService;
        _jwtHelper = jwtHelper;
    }

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
    }

    private static bool VerifyPassword(string rawPassword, string hashedPassword)
    {
        return HashPassword(rawPassword) == hashedPassword;
    }

    public class LoginDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    [HttpPost("Signup")]
    public async Task<IActionResult> SignUp([FromBody] User userInput)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userInput.Email) ||
                string.IsNullOrWhiteSpace(userInput.Username) ||
                string.IsNullOrWhiteSpace(userInput.Password))
            {
                return BadRequest(new { Success = false, Message = "Email, Full Name, and Password are required." });
            }

            var existingByEmail = await _userService.GetByEmailAsync(userInput.Email);

            var existingUsername = await _userService.GetByUsernameAsync(userInput.Username);

            if (existingByEmail != null)
                return BadRequest(new { Success = false, Message = "Email already in use" });

            if (existingUsername != null)
                return BadRequest(new { Success = false, Message = "Username already in use" });

            userInput.Email = userInput.Email.Trim().ToLower();
            userInput.Username = userInput.Username.Trim().ToLower();
            userInput.IsAccepting = true;
            userInput.Password = HashPassword(userInput.Password);

            var user = await _userService.CreateAsync(userInput);

            return Ok(new { Success = true, Message = "User Created Successfully", data = user });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error occurred");
            return StatusCode(500, "Something went wrong on the server.");
        }
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] LoginDto userInput)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userInput.Email) ||
                string.IsNullOrWhiteSpace(userInput.Password))
            {
                return BadRequest(new { success = false, Message = "Email and Password are required." });
            }

            var existingUser = await _userService.GetByEmailAsync(userInput.Email);

            if (existingUser == null || !VerifyPassword(userInput.Password, existingUser.Password))
            {
                return BadRequest(new { success = false, Message = "Invalid credentials" });
            }

            var token = _jwtHelper.GenerateJwtToken(existingUser);

            Response.Cookies.Append("accessToken", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Set false for localhost without HTTPS
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(6)
            });

            var userResponse = new
            {
                existingUser.Id,
                existingUser.Email,
                existingUser.Username,
                existingUser.IsAccepting,
                existingUser.CreatedAt,
                existingUser.UpdatedAt
            };

            return Ok(new { Success = true, Message = "User Login Successfully", data = userResponse });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error occurred");
            return StatusCode(500, "Something went wrong on the server.");
        }
    }

    [HttpPost("Logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("accessToken");
        return Ok(new { Success = true, Message = "User Logout Successfully" });
    }

    [HttpGet("Current-User")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        Console.Write("Current UserId: " + userId);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized("No valid user ID found in token.");

        // Query user by ID (MongoDB or any DB)
        var user = await _userService.GetByIdAsync(userId);
        if (user == null)
            return Unauthorized("User not found.");

        return Ok(new { Success = true, Message = "User fetched Successfully", data = user });
    }

    [HttpPut("toggle-user")]
    public async Task<IActionResult> ToggleUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
            return Unauthorized("No valid user ID found in token.");

        var boolRes = await _userService.ToggleIsAccepting(userId);

        if (!boolRes)
            return BadRequest("Unable to toggle the Accepting Messages");

        return Ok(new { Success = true, Message = "Message Toggled Successfully" });
    }

}