using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Form
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    public required string Name { get; set; }

    [BsonElement("feedback")]
    public required string Feedback { get; set; }

    [BsonElement("gender")]
    public required string Password { get; set; }

    [BsonElement("issueDate")]
    public DateTime IssueDate { get; set; }

    [BsonElement("usagePeriod")]
    public DateTime[] UsagePeriod { get; set; } = [];

    [BsonElement("feedbackType")]
    public required string FeedbackType { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.Now; // take the current system time

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}

