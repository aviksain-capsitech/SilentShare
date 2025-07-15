using MongoDB.Driver;

public class FeedbackService
{
    public readonly IMongoCollection<Feedback> _feedback;

    public FeedbackService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _feedback = database.GetCollection<Feedback>(config["MongoDB:FeedbackCollection"]);
    }

    public async Task<Feedback> CreateAsync(Feedback form)
    {
        await _feedback.InsertOneAsync(form);
        return form;
    }

    public async Task<List<Feedback>> GetAllAsync() =>
        await _feedback.Find(_ => true).ToListAsync();
}