using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Message
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }

  public string? Owner { get; set; }

  public string? Content { get; set; }

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // take the universal time

  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}




