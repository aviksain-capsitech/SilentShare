using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Feedback
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    public required string Name { get; set; }

    [BsonElement("content")]
    public required string Content { get; set; }

    [BsonElement("issueDate")]
    public DateTime IssueDate { get; set; }

    [BsonElement("usagePeriod")]
    public DateTime[] UsagePeriod { get; set; } = [];

    [BsonElement("feedbackType")]
    public required string FeedbackType { get; set; }

    [BsonElement("appVersion")]
    public required string AppVersion { get; set; }

    [BsonElement("screenShot")]
    public required string ScreenShot { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.Now; // take the current system time

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}

