using Common.Core.Abstractions.Interfaces.Repositories;
using Common.Core.Abstractions.Interfaces.UoWs;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Common.Data.UoWs;

public class MongoUnitOfWork : IUnitOfWork
{
    private readonly IMongoDatabase _database;
    private readonly IServiceProvider _serviceProvider;
    private IClientSessionHandle _session;

    public MongoUnitOfWork(IMongoDatabase database, IServiceProvider serviceProvider)
    {
        _database = database;
        _serviceProvider = serviceProvider;
    }

    private IUserRepository _users;
    public IUserRepository Users => _users ??= _serviceProvider.GetRequiredService<IUserRepository>();

    public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        _session = await _database.Client.StartSessionAsync(cancellationToken: cancellationToken);
        _session.StartTransaction();
    }

    public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        await _session.CommitTransactionAsync(cancellationToken);
        _session.Dispose();
        _session = null;
    }

    public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
    {
        await _session.AbortTransactionAsync(cancellationToken);
        _session.Dispose();
        _session = null;
    }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // В MongoDB нет SaveChanges, транзакции обрабатываются отдельно
        return Task.FromResult(0);
    }

    public void Dispose()
    {
        _session?.Dispose();
        GC.SuppressFinalize(this);
    }
}