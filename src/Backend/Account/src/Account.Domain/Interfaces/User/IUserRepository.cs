using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Account.Domain.Interfaces.User;

public interface IUserRepository : IRepository<Models.User>
{
    Task<IEnumerable<Models.User>> Get(int? take, int skip = 0, FilterDefinition<Models.User> filter = null,
        SortDefinition<Models.User> sort = null);
}
