using Account.Domain.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Account.Domain.Models
{
    public class User : IEntity
    {
        /// <summary>
        ///     ID
        /// </summary>
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        /// <summary>
        ///     Отобрвжаемое имя пользователя
        /// </summary>
        [BsonRequired]
        public string DisplayName { get; set; }

        /// <summary>
        ///     Электронная почта пользователя
        /// </summary>
        [BsonRequired]
        public string Email { get; set; }

        /// <summary>
        ///     Захэшированный пароль пользователя
        /// </summary>
        [BsonRequired]
        public string PasswordHash { get; set; }

        /// <summary>
        ///     Роль пользователя
        /// </summary>
        public string Role { get; set; }
    }
}
