using System.Diagnostics.CodeAnalysis;
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

    public async Task<Message?> DeleteAsync(string id)
    {
        var message = await _messages.Find(m => m.Id == id).FirstOrDefaultAsync();

        if (message == null)
            return null;

        await _messages.DeleteOneAsync(m => m.Id == id);
        return message;
    }

    public class PaginatedResult<T>
    {
        public List<T> Items { get; set; }
        public long TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    public async Task<PaginatedResult<Message>> GetAllByUsernameAsync(string username, int pageNumber, int pageSize)
    {
        var filter = Builders<Message>.Filter.Eq(m => m.Owner, username);

        var totalCount = await _messages.CountDocumentsAsync(filter);

        var messages = await _messages
        .Find(filter)
        .Skip((pageNumber - 1) * pageSize)
        .Limit(pageSize)
        .SortByDescending(m => m.CreatedAt)
        .ToListAsync();

        return new PaginatedResult<Message>
        {
            Items = messages,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<Message> GetByIdAsync(string id) =>
        await _messages.Find(t => t.Id == id).FirstOrDefaultAsync();

    public async Task<List<Message>> GetAllAsync() =>
        await _messages.Find(_ => true).ToListAsync();
}





