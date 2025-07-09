using MongoDB.Driver;
using SilentShare.Models;

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
    /* 
        FirstOrDefultAsync -> It returns the first element in a sequence that matches a condition — or null (for reference types) 
        if no match is found — asynchronously.
    */


    public async Task<User> GetByUsernameAsync(string username) =>
        await _users.Find(u => u.Username == username.ToLower()).FirstOrDefaultAsync();

    public async Task<User> GetByIdAsync(string id) =>
        await _users.Find(u => u.Id == id).FirstOrDefaultAsync();

}