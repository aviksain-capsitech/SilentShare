using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SilentShare.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public required string Username { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }

    public required Boolean IsAccepting { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now; // take the current system time

    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}