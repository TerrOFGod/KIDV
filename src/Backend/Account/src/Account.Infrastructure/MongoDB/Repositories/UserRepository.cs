using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Account.Domain.Interfaces.User;
using Account.Domain.Models;
using Account.Infrastructure.MongoDB.Base;
using MongoDB.Driver;

namespace Account.Infrastructure.MongoDB.Repositories;

public class UserRepository : MongoDBRepository<User>, IUserRepository
{
    public UserRepository(SampleContext context)
    {
        if (context is null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        collection = context.Users;
    }

    public async Task<IEnumerable<User>> Get(int? take, int skip = 0, FilterDefinition<User> filter = null,
        SortDefinition<User> sort = null)
    {
        if (take <= 0)
        {
            throw new ArgumentException($"{nameof(take)} arg can't be less or equal 0.", nameof(take));
        }

        if (skip < 0)
        {
            throw new ArgumentException($"{nameof(skip)} arg can't be less 0.", nameof(take));
        }

        filter ??= FilterDefinition<User>.Empty;

        IFindFluent<User, User> clicks = collection.Find(filter)
            .Skip(skip);

        if (take.HasValue)
        {
            clicks = clicks.Limit(take);
        }

        return await clicks.ToListAsync();
    }
}
