using MongoDB.Driver;

public class MessageService
{
    private readonly IMongoCollection<Message> _messages;

    public MessageService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _messages = database.GetCollection<Message>(config["MongoDB:MessageCollection"]);
    }

    public async Task<Message> CreateAsync(Message message)
    {
        await _messages.InsertOneAsync(message);
        return message;
    }

    public async Task<Message> UpdateAsync(string id, Message newMessage)
    {
        await _messages.ReplaceOneAsync(u => u.Id == id, newMessage);
        return newMessage;
    }

    public async Task<Message?> DeleteAsync(string id)
    {
        var message = await _messages.Find(m => m.Id == id).FirstOrDefaultAsync();

        if (message == null)
            return null;

        await _messages.DeleteOneAsync(m => m.Id == id);
        return message;
    }

    public async Task<List<Message>> GetAllByUsernameAsync(string username) =>
        await _messages.Find(t => t.Owner == username).ToListAsync();

    public async Task<Message> GetByIdAsync(string id) =>
        await _messages.Find(t => t.Id == id).FirstOrDefaultAsync();

    public async Task<List<Message>> GetAllAsync() =>
        await _messages.Find(_ => true).ToListAsync();
}





