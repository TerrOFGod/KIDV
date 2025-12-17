using Common.Core.Models;
using Common.Core.Models.User;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System.Linq.Expressions;
using Common.Core.Abstractions.Interfaces.Repositories;

namespace Common.Data.Repositories;

public abstract class BaseRepository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly IMongoCollection<T> _collection;
    protected readonly ILogger<BaseRepository<T>> _logger;

    protected BaseRepository(IMongoDatabase database, string collectionName, ILogger<BaseRepository<T>> logger)
    {
        _collection = database.GetCollection<T>(collectionName);
        _logger = logger;

        EnsureIndexes();
    }

    protected virtual void EnsureIndexes()
    {
        // Override in derived classes to create indexes
    }

    public virtual async Task<T> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _collection.Find(e => e.Id == id).FirstOrDefaultAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting entity by id: {Id}", id);
            throw;
        }
    }

    public virtual async Task<T> GetOneAsync(Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default)
    {
        try
        {
            return await _collection.Find(predicate).FirstOrDefaultAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting entity");
            throw;
        }
    }

    public virtual async Task<List<T>> GetAsync(Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default)
    {
        try
        {
            return await _collection.Find(predicate).ToListAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting entities");
            throw;
        }
    }

    public virtual async Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            return await _collection.Find(_ => true).ToListAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all entities");
            throw;
        }
    }

    public virtual async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        try
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.UpdatedAt = DateTime.UtcNow;

            await _collection.InsertOneAsync(entity, cancellationToken: cancellationToken);
            return entity;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding entity");
            throw;
        }
    }

    public virtual async Task<T> UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        try
        {
            entity.UpdatedAt = DateTime.UtcNow;

            var filter = Builders<T>.Filter.Eq(e => e.Id, entity.Id);
            var options = new FindOneAndReplaceOptions<T>
            {
                ReturnDocument = ReturnDocument.After
            };

            return await _collection.FindOneAndReplaceAsync(filter, entity, options, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating entity: {Id}", entity.Id);
            throw;
        }
    }

    public virtual async Task DeleteAsync(string id, CancellationToken cancellationToken = default)
    {
        try
        {
            await _collection.DeleteOneAsync(e => e.Id == id, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting entity: {Id}", id);
            throw;
        }
    }

    public virtual async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default)
    {
        try
        {
            return await _collection.Find(predicate).AnyAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking entity existence");
            throw;
        }
    }

    public virtual async Task<int> CountAsync(Expression<Func<T, bool>> predicate = null,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var filter = predicate ?? (_ => true);
            return (int)await _collection.CountDocumentsAsync(filter, cancellationToken: cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error counting entities");
            throw;
        }
    }

    public virtual async Task<List<T>> GetPagedAsync(int page, int pageSize, Expression<Func<T, bool>> predicate = null,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var filter = predicate ?? (_ => true);
            return await _collection.Find(filter)
                .Skip((page - 1) * pageSize)
                .Limit(pageSize)
                .ToListAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting paged entities");
            throw;
        }
    }
}