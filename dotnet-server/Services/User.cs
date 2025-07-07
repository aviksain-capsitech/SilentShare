using MongoDB.Driver;


public class UserService
{
    public readonly IMongoCollection<User> _users;

    public UserService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _users = database.GetCollection<User>(config["MongoDB:UserCollection"]);
    }

    public async Task<User> CreateAsync(User user)
    {
        await _users.InsertOneAsync(user);
        return user;
    }

    public async Task<User> GetByEmailAsync(string email) =>
        await _users.Find(u => u.Email == email.ToLower()).FirstOrDefaultAsync();

    public async Task<User> GetByIdAsync(string id) =>
        await _users.Find(u => u.Id == id).FirstOrDefaultAsync();

}