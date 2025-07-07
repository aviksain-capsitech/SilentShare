using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace SilentShare.Controllers;

[ApiController]
[Route("Api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly MessageService _messageService;
    private readonly ILogger<MessageController> _logger;

    public MessageController(ILogger<MessageController> logger, MessageService messageService)
    {
        _logger = logger;
        _messageService = messageService;
    }

    private string? GetUserId() =>
      User.FindFirstValue(ClaimTypes.NameIdentifier);

    [HttpPost("Create")]
    public async Task<IActionResult> CreateMessage([FromBody] Message newMessage)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(newMessage.Content) ||
                string.IsNullOrWhiteSpace(newMessage.Title))
            {
                return BadRequest("Content and Title is Required."); // status code 400
            }

            var userId = GetUserId();

            if (userId == null)
            {
                return Unauthorized("You needed to login to create Message"); // status code 500
            }

            newMessage.OwnerId = userId;
            newMessage.Title = newMessage.Title.Trim();
            newMessage.Content = newMessage.Content.Trim();

            await _messageService.CreateAsync(newMessage);
            return Ok(new { Success=true, Message="Message Created Successfully", data=newMessage }); // status code 200
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
                return BadRequest("You needed to login to update Message");
            }

            var existing = await _messageService.GetByIdAsync(messageId);

            if (existing == null || existing.OwnerId != userId)
                return Unauthorized();

            if (updatedMessage.Title != null)
                existing.Title = updatedMessage.Title;

            if (updatedMessage.Content != null)
                existing.Content = updatedMessage.Content;

            existing.UpdatedAt = DateTime.UtcNow;

            await _messageService.UpdateAsync(messageId, existing);
            return Ok(new { Success=true, Message="Message Updated Successfully", data=existing });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error occurred");
            return StatusCode(500, "Something went wrong on the server.");
        }
    }

    [HttpDelete("Delete/{MessageId:length(24)}")]
    public async Task<IActionResult> DeleteMessage(string messageId)
    {
        try
        {
            var userId = GetUserId();

            if (userId == null)
            {
                return BadRequest("You needed to login to delete Message");
            }

            var existing = await _messageService.GetByIdAsync(messageId);

            if (existing == null || existing.OwnerId != userId)
                return Unauthorized("Unable to find the Message");

            var deletedMessage = await _messageService.DeleteAsync(messageId);

            return Ok(new { Success=true, Message="Message Deleted Successfully", data=deletedMessage });
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
            return Ok(new { Success=true, Message="Message fetched Successfully", data=message });
        }
        else
        {
            return StatusCode(500, "Something went Wrong");
        }
    }

    [HttpGet("User/Get-All")]
    public async Task<IActionResult> GetAllUserMessages()
    {
        var userId = GetUserId();

        if (userId == null)
        {
            return BadRequest("You needed to login to get all Messages");
        }

        var messages = await _messageService.GetAllByUserIdAsync(userId);
        return Ok(new { Success=true, Message="All User Messages fetched Successfully", data=messages });
    }

    [HttpGet("Get-All")]
    public async Task<IActionResult> GetAllMessages()
    {
        var userId = GetUserId();

        if (userId == null)
        {
            return BadRequest("You needed to login to get all Messages");
        }

        var messages = await _messageService.GetAllAsync();
        return Ok(new { Success=true, Message="All Messages fetched Successfully", data=messages });
    }
}

