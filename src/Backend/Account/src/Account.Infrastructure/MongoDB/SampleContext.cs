using Account.Domain.Models;
using Account.Infrastructure.MongoDB.Base;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Account.Infrastructure.MongoDB;

public class SampleContext : MongoDBContext
{
    public SampleContext(IOptions<MongoDBSettings> settings) : base(settings)
    {
    }

    public IMongoCollection<User> Users => _db.GetCollection<User>(nameof(Users));
}
