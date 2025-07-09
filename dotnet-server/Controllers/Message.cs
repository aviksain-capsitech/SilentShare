using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace SilentShare.Controllers;

[ApiController]
[Route("Api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly UserService _userService;
    private readonly MessageService _messageService;
    private readonly ILogger<MessageController> _logger;

    public MessageController(ILogger<MessageController> logger, MessageService messageService, UserService userService)
    {
        _logger = logger;
        _messageService = messageService;
        _userService = userService;
    }

    private string? GetUserId() =>
      User.FindFirstValue(ClaimTypes.NameIdentifier);

    private string? GetUsername()
    {
        return User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
    }

    // create a message to the owner by username as owner
    [HttpPost("Create/{username}")]
    public async Task<IActionResult> CreateMessage(string username, [FromBody] Message newMessage)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(newMessage.Content))
            {
                return BadRequest("Content and Title is Required."); // status code 400
            }

            newMessage.Owner = username;
            newMessage.Content = newMessage.Content.Trim();

            await _messageService.CreateAsync(newMessage);
            return Ok(new { Success = true, Message = "Message Send Successfully", data = newMessage }); // status code 200
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error occurred");
            return StatusCode(500, "Something went wrong on the server.");
        }
    }

    [HttpPost("Update/{MessageId:length(24)}")]
    public async Task<IActionResult> UpdateMessage(string messageId, [FromBody] Message updatedMessage)
    {
        try
        {
            var userId = GetUserId();

            if (userId == null)
            {
                return Unauthorized("You needed to login to update Message");
            }

            var existing = await _messageService.GetByIdAsync(messageId);

            if (existing == null || existing.Owner != userId)
                return Unauthorized();

            if (updatedMessage.Content != null)
                existing.Content = updatedMessage.Content;

            existing.UpdatedAt = DateTime.UtcNow;

            await _messageService.UpdateAsync(messageId, existing);
            return Ok(new { Success = true, Message = "Message Updated Successfully", data = existing });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error occurred");
            return StatusCode(500, "Something went wrong on the server.");
        }
    }

    // delete a particular message by message id
    [HttpDelete("Delete/{MessageId:length(24)}")]
    public async Task<IActionResult> DeleteMessage(string messageId)
    {
        try
        {
            var userId = GetUserId();

            var username = GetUsername();

            if (userId == null)
            {
                return Unauthorized("You needed to login to delete Message");
            }

            // Console.Write(messageId);

            var existing = await _messageService.GetByIdAsync(messageId);

            Console.Write(existing.Owner);

            if (existing == null || existing.Owner != username)
                return BadRequest("Unable to delete the Message");

            var deletedMessage = await _messageService.DeleteAsync(messageId);

            return Ok(new { Success = true, Message = "Message Deleted Successfully", data = deletedMessage });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error occurred");
            return StatusCode(500, "Something went wrong on the server.");
        }
    }

    [HttpGet("{MessageId:length(24)}")]
    public async Task<IActionResult> GetMessage(string messageId)
    {
        var userId = GetUserId();

        if (userId == null)
        {
            return Unauthorized("You needed to login to get all Messages");
        }

        var message = await _messageService.GetByIdAsync(messageId);

        if (message != null)
        {
            return Ok(new { Success = true, Message = "Message fetched Successfully", data = message });
        }
        else
        {
            return StatusCode(500, "Something went Wrong");
        }
    }


    // fetch all the messages by the username 
    [HttpGet("Get-All")]
    public async Task<IActionResult> GetAllUserMessages()
    {
        var userId = GetUserId();

        if (userId == null)
        {
            return BadRequest("You needed to login to get all Messages");
        }

        var userDetails = await _userService.GetByIdAsync(userId);
        Console.Write("User Details: " + userDetails);

        var messages = await _messageService.GetAllByUsernameAsync(userDetails.Username);
        return Ok(new { Success = true, Message = "All User Messages fetched Successfully", data = messages });
    }
}

