'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from './header.module.css';

function parseJwt<T extends Record<string, unknown>>(token: string): T {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)) as T;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const avatarWrapperRef = useRef<HTMLDivElement>(null);

  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setCheckedAuth(true);
  }, [pathname]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setUserRole(null);

    const { id: userId } = parseJwt<{ id: string }>(token)
    axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
      { id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      const { profile } = res.data as { profile: { role: string } };
      setUserRole(profile.role);
    })
    .catch(() => {
      setUserRole(null);
    });
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        avatarWrapperRef.current &&
        !avatarWrapperRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  if (!checkedAuth) return null;

  return (
    <header className={styles.header}>
      <div className={styles.brand} onClick={() => router.push('/')}>
        GameAcademy
      </div>

      {isLoggedIn ? (
        <div ref={avatarWrapperRef} className={styles.avatarWrapper}>
        <div
            className={styles.avatar}
            onClick={() => setMenuOpen(v => !v)}
        >
            UA
        </div>
        {menuOpen && (
            <nav className={styles.menu}>
            <Link
                href="/profile"
                className={styles.menuLink}
                onClick={() => setMenuOpen(false)}
            >
                Профиль
            </Link>
            <Link
                href="/profile/games"
                //href="/games"
                className={styles.menuLink}
                onClick={() => setMenuOpen(false)}
            >
                Библиотека проектов
            </Link>
            {userRole === 'Admin' && (
                <>
                <Link
                    href="/admin/users"
                    className={styles.menuLink}
                    onClick={() => setMenuOpen(false)}
                >
                    Админ-панель пользователей
                </Link>
                <Link
                    href="/admin/games"
                    className={styles.menuLink}
                    onClick={() => setMenuOpen(false)}
                >
                    Админ-панель игр
                </Link>
                </>
            )}
            <button
                className={styles.menuLogout}
                onClick={handleLogout}
            >
                Выйти
            </button>
            </nav>
        )}
        </div>
    ) : (
        <nav className={styles.nav}>
        <Link href="/auth/login" className={styles.navLink}>Войти</Link>
        <Link href="/auth/register" className={styles.navLink}>Регистрация</Link>
        </nav>
    )}

    <div className={styles.spacer} />
    </header>
  );
}