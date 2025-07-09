using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;


public class JwtHelper
{
    private readonly string _jwtSecret;

    public JwtHelper(IConfiguration config)
    {
        _jwtSecret = config["Jwt:Secret"] ?? throw new Exception("JWT Secret not found in config");
    }

    public string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtSecret);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]  // ClaimsIdentity: basically it is for the payload for reverification
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id ?? string.Empty),
                new Claim(ClaimTypes.Name, user.Username ?? string.Empty),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty)
            }),
            Expires = DateTime.UtcNow.AddHours(6),  // Token will expire in 6 hour.
            SigningCredentials = new SigningCredentials( // SigningCredentials specifies how the token is signed
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);  // creates the JWT based on the descriptor.
        return tokenHandler.WriteToken(token);  // converts it into a string format to return to clients.
    }
}
