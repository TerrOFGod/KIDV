'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 — Страница не найдена</h1>
      <p className={styles.description}>
        К сожалению, такой страницы не существует или она была перемещена.
      </p>
      <Link href="/" className={styles.link}>
        ← Вернуться на главную
      </Link>
    </div>
  );
}