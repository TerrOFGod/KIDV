'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './admin-users.module.css';
import { useAuthExpiration } from '@/components/useAuthExp';

interface User {
  email: string;
  displayName?: string;
  role: string;
}

interface UsersResponse {
  users: User[];
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  useAuthExpiration()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/');
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1])) as { id: string };
    const userId = payload.id;
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
        { id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const role = res.data.profile.role;
        if (role !== 'Admin') {
          router.replace('/');
        }
      })
      .catch(() => {
        router.replace('/');
      });
  }, [router]);

  const loadUsers = async () => {
    try {
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
    } catch {
      setError('Не удалось загрузить список пользователей');
    }
  };

  useEffect(() => {
    loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const onRoleChange = async (email: string, newRole: string) => {
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
    } catch {
      alert('Ошибка при смене роли');
    }
  };

  const onDelete = async (email: string) => {
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
    } catch {
      alert('Ошибка при удалении пользователя');
    }
  };

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <main className={styles.container}>
      <h1>Управление пользователями</h1>

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Поиск по имени…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput} 
        />
        <button onClick={loadUsers} style={{ marginLeft: '8px' }}>
          Найти
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Имя</th>
            <th>Роль</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>{u.displayName || '-'}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => onRoleChange(u.email, e.target.value)}
                >
                  {['Guest', 'Student', 'Teacher', 'Admin'].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(u.email)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}