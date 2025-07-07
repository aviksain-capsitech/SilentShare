using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SilentShare.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HelloController : ControllerBase
{
    [HttpGet]
    public IActionResult GetHello()
    {
        return Ok("Hello from controller");
    }
}
