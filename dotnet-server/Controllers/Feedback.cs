using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("Api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly FeedbackService _feedbackService;

    private readonly ILogger<FeedbackController> _logger;

    public FeedbackController(ILogger<FeedbackController> logger, FeedbackService feedbackService)
    {
        _logger = logger;
        _feedbackService = feedbackService;
    }

    /*
        name
        content 
        gender
        password
        feedbackType
        appVersion
    */

    [HttpPost("create")]
    public async Task<IActionResult> createFeedback([FromBody] Feedback newFeedback)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(newFeedback.Name) ||
            string.IsNullOrWhiteSpace(newFeedback.Content) ||
            string.IsNullOrWhiteSpace(newFeedback.FeedbackType) ||
            string.IsNullOrWhiteSpace(newFeedback.AppVersion) ||
            string.IsNullOrWhiteSpace(newFeedback.ScreenShot) ||
            newFeedback.IssueDate == default(DateTime) ||
            newFeedback.UsagePeriod[0] == default(DateTime))
            {
                return BadRequest(new { status = false, Message = "All fields are Required" });
            }

            var res = await _feedbackService.CreateAsync(newFeedback);

            return Ok(new { success = true, Message = "Feedback Created Successfully", data = res }); 
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error occurred");
            return StatusCode(500, new { success = false, Message = "Something went wrong on the server." });
        }
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> getAllFeedback()
    {
        try
        {
            var allFeedbacks = await _feedbackService.GetAllAsync();

            return Ok(new { success = true, Message = "All message Featched Successfully", data = allFeedbacks });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error occurred");
            return StatusCode(500, new { success = false, Message = "Something went wrong on the server." });
        }

    }
}
