// components/layout/Header.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/features/auth/LoginModal';
import RegisterModal from '@/components/features/auth/RegisterModal';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  const mainMenuItems = [
    { id: 'hero', label: 'Главная', path: '/' },
    { id: 'projects', label: 'Проекты', path: '/' },
    { id: 'team', label: 'Команда', path: '/' },
    { id: 'blog', label: 'Блог', path: '/' },
    { id: 'partners', label: 'Партнеры', path: '/' },
    { id: 'awards', label: 'Награды', path: '/' },
    { id: 'faq', label: 'FAQ', path: '/' },
    { id: 'contact', label: 'Контакты', path: '/' },
  ];

  const handleMainMenuClick = (item: typeof mainMenuItems[0]) => {
    if (pathname !== '/') {
      router.push('/');
      // Ждем немного перед скроллом чтобы страница успела загрузиться
      setTimeout(() => {
        onSectionChange(item.id);
        const element = document.getElementById(item.id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      onSectionChange(item.id);
      const element = document.getElementById(item.id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    setShowLoginModal(true);
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    setShowRegisterModal(true);
    setIsMenuOpen(false);
  };

  const handleProfile = () => {
    router.push('/profile');
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };

  const handleAdmin = () => {
    router.push('/admin');
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMenuOpen(false);
    if (pathname !== '/') {
      router.push('/');
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Логотип */}
            <button
              onClick={() => {
                router.push('/');
                onSectionChange('hero');
              }}
              className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              ИТИС КИРВИ
            </button>

            {/* Десктопное меню */}
            <div className="hidden md:flex items-center space-x-8">
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMainMenuClick(item)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id && pathname === '/'
                      ? 'text-primary font-semibold bg-blue-300/10'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Кнопки авторизации или профиль */}
              {!isAuthenticated ? (
                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    Войти
                  </button>
                  <button
                    onClick={handleRegister}
                    className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
                  >
                    Регистрация
                  </button>
                </div>
              ) : (
                <div className="relative ml-4">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-300 bg-blue-300 rounded-full flex items-center justify-center text-sm font-semibold">
                      {getUserInitials(user?.displayName || 'U')}
                    </div>
                    <span className="text-gray-700">{user?.displayName}</span>
                    <motion.span
                      animate={{ rotate: showUserMenu ? 180 : 0 }}
                      className="text-gray-500"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <button
                          onClick={handleProfile}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Мой профиль
                        </button>
                        <button
                            onClick={handleAdmin}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Админ-панель
                        </button>
                        {user?.role === 'Admin' && (
                          <button
                            onClick={handleAdmin}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            Админ-панель
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Выйти
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Мобильное меню */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Мобильное меню выпадающее */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white border rounded-lg shadow-lg">
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMainMenuClick(item)}
                  className={`block w-full text-left px-4 py-3 border-b last:border-b-0 ${
                    activeSection === item.id && pathname === '/'
                      ? 'text-primary font-semibold bg-blue-300/10'
                      : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Кнопки авторизации для мобильной версии */}
              <div className="px-4 py-3 border-t">
                {!isAuthenticated ? (
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleLogin}
                      className="w-full text-left py-2 text-gray-600"
                    >
                      Войти
                    </button>
                    <button
                      onClick={handleRegister}
                      className="w-full bg-blue-300 text-white py-2 rounded-lg text-center"
                    >
                      Регистрация
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 py-2">
                      <div className="w-8 h-8 bg-blue-300 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {getUserInitials(user?.displayName || 'U')}
                      </div>
                      <span className="text-gray-700">{user?.displayName}</span>
                    </div>
                    <button
                      onClick={handleProfile}
                      className="w-full text-left py-2 text-gray-600"
                    >
                      Мой профиль
                    </button>
                    {user?.role === 'Admin' && (
                      <button
                        onClick={handleAdmin}
                        className="w-full text-left py-2 text-gray-600"
                      >
                        Админ-панель
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 text-red-600"
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Модальные окна */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
}