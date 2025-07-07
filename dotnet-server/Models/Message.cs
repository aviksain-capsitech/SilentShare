using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Message
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }

  [BsonElement("owner")]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? OwnerId { get; set; }

  [BsonElement("title")]
  public string? Title { get; set; }

  [BsonElement("content")]
  public string? Content { get; set; }

  [BsonElement("createdAt")]
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  [BsonElement("updatedAt")]
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}




