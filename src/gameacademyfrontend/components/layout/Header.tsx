'use client'; // Директива для клиентского компонента

import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link"; // Измененный импорт для Next.js
import axios from 'axios';
import { Menu } from "lucide-react";
import styles from "@/components/header.module.css"

function parseJwt<T extends Record<string, unknown>>(token: string): T {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)) as T;
}

// Тип для навигационных элементов
type NavItem = {
  label: string;
  path: string;
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const avatarWrapperRef = useRef<HTMLDivElement>(null);

  const [checkedAuth, setCheckedAuth] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Типизированный массив элементов навигации
  const navItems: NavItem[] = [
    { label: "О кафедре", path: "/" },
    { label: "Сотрудники", path: "/staff" },
    { label: "Проекты кафедры", path: "/portfolio" },
    { label: "Новости", path: "/news" },
    { label: "Карта успеха", path: "/map-success" },
    { label: "Портфолио студентов", path: "/games" },
  ];

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
    <header className="bg-black/95 text-white font-montserrat sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Next.js Link с href вместо to */}
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-primary transition"
        >
          ИТИС КИРВИ
        </Link>

        {/* Десктопная навигация */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="hover:text-red-800 transition text-sm font-medium uppercase tracking-widest align-middle text-center"
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <div ref={avatarWrapperRef} className={styles.avatarWrapper}>
              <div
                className={styles.avatar}
                onClick={() => setMenuOpen(v => !v)}
              >
                НП
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
            <>
              <Link href="/auth/login" className="hover:text-red-800 transition text-sm font-medium uppercase tracking-widest">Войти</Link>
              <Link href="/auth/register" className="hover:text-red-800 transition text-sm font-medium uppercase tracking-widest">Регистрация</Link>
            </>
          )}
        </nav>

        {/* Кнопка мобильного меню */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden bg-dark px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="block text-white hover:text-primary transition py-1"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
