'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './error.module.css';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error('Произошла ошибка на стороне клиента или сервера:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Упс… что‐то пошло не так.</h1>
      <p className={styles.description}>
        Возникла внутренняя ошибка сервера или при рендере страницы. Попробуйте обновить страницу либо вернуться на главную.
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => reset()}>
          Повторить попытку
        </button>
        <button className={styles.button} onClick={() => router.push('/')}>
          На главную
        </button>
      </div>
    </div>
  );
}