using Common.Core.Interfaces;
using Common.Core.Models.User;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace Common.Data.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(IMongoDatabase database, ILogger<UserRepository> logger)
        : base(database, "users", logger)
    {
    }

    protected override void EnsureIndexes()
    {
        // Создаем уникальный индекс для email
        var emailIndexKeys = Builders<User>.IndexKeys.Ascending(u => u.Email);
        var emailIndexOptions = new CreateIndexOptions { Unique = true };
        var emailIndexModel = new CreateIndexModel<User>(emailIndexKeys, emailIndexOptions);

        // Создаем индекс для поиска по displayName
        var displayNameIndexKeys = Builders<User>.IndexKeys.Ascending(u => u.DisplayName);
        var displayNameIndexModel = new CreateIndexModel<User>(displayNameIndexKeys);

        _collection.Indexes.CreateMany(new[] { emailIndexModel, displayNameIndexModel });
    }

    public async Task<User> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return await GetOneAsync(u => u.Email == email, cancellationToken);
    }

    public async Task<List<User>> SearchByDisplayNameAsync(string searchTerm,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
            return await GetAllAsync(cancellationToken);

        var filter = Builders<User>.Filter.Regex(u => u.DisplayName,
            new MongoDB.Bson.BsonRegularExpression(searchTerm, "i"));

        return await _collection.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<bool> EmailExistsAsync(string email, CancellationToken cancellationToken = default)
    {
        return await ExistsAsync(u => u.Email == email, cancellationToken);
    }
}
