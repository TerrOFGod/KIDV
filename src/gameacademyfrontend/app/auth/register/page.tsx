'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/games');
    }
  }, [router]);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Ошибка регистрации');
        return;
      }

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      }

      router.push('/auth/login');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Имя"
          className={styles.input}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Зарегистрироваться
        </button>
      </form>

      <p className={styles.registerLink}>
        Уже есть аккаунт?&nbsp;
        <Link href="/auth/login" className={styles.link}>
          Войти в него
        </Link>
      </p>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}