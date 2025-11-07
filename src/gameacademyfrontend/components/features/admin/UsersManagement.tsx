// components/features/admin/UsersManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface User {
  email: string;
  displayName?: string;
  role: string;
  createdAt?: string;
}

interface UsersResponse {
  users: User[];
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      const url = searchTerm
        ? `${process.env.NEXT_PUBLIC_API_URL_API}/user/search?query=${encodeURIComponent(searchTerm)}`
        : `${process.env.NEXT_PUBLIC_API_URL_API}/user/users`;

      const { data } = await axios.get<UsersResponse>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users);
      setError('');
    } catch (err) {
      setError('Не удалось загрузить список пользователей');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (email: string, newRole: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/users/change-role`,
        { email, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert('Ошибка при смене роли');
      console.error('Error changing role:', err);
    }
  };

  const handleDelete = async (email: string) => {
    if (!confirm(`Удалить пользователя ${email}?`)) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/delete`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (err) {
      alert('Ошибка при удалении пользователя');
      console.error('Error deleting user:', err);
    }
  };

  // Статистика пользователей
  const userStats = {
    total: users.length,
    admins: users.filter(u => u.role === 'Admin').length,
    teachers: users.filter(u => u.role === 'Teacher').length,
    students: users.filter(u => u.role === 'Student').length,
    guests: users.filter(u => u.role === 'Guest').length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Загрузка пользователей...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление пользователями</h2>
          <p className="text-gray-600">Управление учетными записями и правами доступа</p>
        </div>
        <button
          onClick={fetchUsers}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>🔄</span>
          <span>Обновить</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего пользователей</h3>
          <div className="text-2xl font-bold text-gray-900">{userStats.total}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Администраторы</h3>
          <div className="text-2xl font-bold text-blue-300">{userStats.admins}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Преподаватели</h3>
          <div className="text-2xl font-bold text-green-600">{userStats.teachers}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Студенты</h3>
          <div className="text-2xl font-bold text-purple-600">{userStats.students}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Гости</h3>
          <div className="text-2xl font-bold text-gray-600">{userStats.guests}</div>
        </motion.div>
      </div>

      {/* Поиск и фильтры */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Поиск пользователей
            </label>
            <div className="flex gap-2">
              <input
                id="search"
                type="text"
                placeholder="Введите email или имя пользователя..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={fetchUsers}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Найти
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Таблица пользователей */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Пользователь
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Роль
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата регистрации
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <motion.tr
                key={user.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.displayName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.displayName || 'Без имени'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.email, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-primary ${
                      user.role === 'Admin' 
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : user.role === 'Teacher'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : user.role === 'Student'
                        ? 'bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    {['Guest', 'Student', 'Teacher', 'Admin'].map((role) => (
                      <option key={role} value={role}>
                        {role === 'Guest' && 'Гость'}
                        {role === 'Student' && 'Студент'}
                        {role === 'Teacher' && 'Преподаватель'}
                        {role === 'Admin' && 'Администратор'}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="text-red-600 hover:text-red-900 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Удалить
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'Пользователи не найдены' : 'Нет пользователей'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}