'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthExpiration } from '@/components/useAuthExp';
import axios from 'axios';
import styles from './admin-games.module.css';

interface Game {
  _id: string;
  title: string;
  uploader: string;
  createdAt: string;
}

interface Duplicate {
    _id: string;
    zipHash: string;
    author?: string;
    productName?: string;
    fileHashes?: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: Record<string, any>;
    createdAt: string;
  }

export default function AdminGamesPage() {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [dups, setDups] = useState<Duplicate[]>([]);
  const [error, setError] = useState<string>('');
  useAuthExpiration()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.replace('/');
    const payload = JSON.parse(atob(token.split('.')[1])) as { id: string };
    const userId = payload.id;
    axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
      { id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      if (res.data.profile.role !== 'Admin') router.replace('/');
    }).catch(() => router.replace('/'));
  }, [router]);

  useEffect(() => {
    axios.get<{ games: Game[] }>(`${process.env.NEXT_PUBLIC_API_URL}/admin/games`)
      .then(res => setGames(res.data.games))
      .catch(() => setError('Не удалось загрузить игры'));
    axios.get<{ duplicates: Duplicate[] }>(`${process.env.NEXT_PUBLIC_API_URL}/admin/duplicates`)
      .then(res => setDups(res.data.duplicates))
      .catch(() => setError('Не удалось загрузить историю дубликатов'));
  }, []);

  const deleteGame = async (id: string) => {
    if (!confirm('Удалить эту игру?')) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/games/delete`, { id });
      setGames(g => g.filter(x => x._id !== id));
    } catch {
      alert('Ошибка при удалении игры');
    }
  };

  const deleteDup = async (id: string) => {
    if (!confirm('Удалить запись дубликата?')) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/duplicates/delete`, { id });
      setDups(d => d.filter(x => x._id !== id));
    } catch {
      alert('Ошибка при удалении дубликата');
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <main className={styles.container}>
      <h1>Админ-панель: Игры и Дубликаты</h1>

      <section className={styles.section}>
        <h2>Все игры</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Uploader</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map(g => (
              <tr key={g._id}>
                <td>{g.title}</td>
                <td>{g.uploader}</td>
                <td>{new Date(g.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => deleteGame(g._id)} className={styles.deleteBtn}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2>История дубликатов</h2>
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Zip-hash</th>
                <th>Author</th>
                <th>Product</th>
                <th>Files&nbsp;(&nbsp;#&nbsp;)</th>
                <th>Meta</th>
                <th>Created</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {dups.map(d => (
                <tr key={d._id}>
                <td className={styles.hashCell}>{d.zipHash}</td>
                <td>{d.author || '—'}</td>
                <td>{d.productName || '—'}</td>

                {/* количество файлов и разворачиваемое содержимое */}
                <td>
                    {d.fileHashes ? Object.keys(d.fileHashes).length : 0}
                    {d.fileHashes && (
                    <details>
                        <summary>детали</summary>
                        <pre className={styles.meta}>
                            {JSON.stringify(d.fileHashes, null, 2)}
                        </pre>
                    </details>
                    )}
                </td>

                <td>
                    <pre className={styles.meta}>
                        {JSON.stringify(d.metadata, null, 2)}
                    </pre>
                </td>

                <td>{new Date(d.createdAt).toLocaleString()}</td>

                <td>
                    <button
                    onClick={() => deleteDup(d._id)}
                    className={styles.deleteBtn}
                    >
                    Удалить
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </section>
    </main>
  );
}