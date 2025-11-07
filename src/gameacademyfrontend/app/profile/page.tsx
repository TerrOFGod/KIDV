/* eslint-disable @typescript-eslint/no-explicit-any */
// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Доступ запрещен</h2>
          <p className="text-gray-600">Пожалуйста, войдите в систему</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Хлебные крошки */}
          <nav className="mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              ← На главную
            </button>
          </nav>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Заголовок профиля */}
            <div className="bg-blue-300 text-white p-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.displayName.split(' ').map(part => part[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{user.displayName}</h1>
                  <p className="text-primary/80 text-lg">{user.email}</p>
                  <span className="inline-block mt-2 px-4 py-1 bg-white/20 rounded-full text-sm">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Навигация по вкладкам */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                {[
                  { id: 'info', label: 'Основная информация' },
                  { id: 'projects', label: 'Мои проекты' },
                  { id: 'settings', label: 'Настройки' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Содержимое вкладок */}
            <div className="p-8">
              {activeTab === 'info' && <ProfileInfo user={user} />}
              {activeTab === 'projects' && <ProfileProjects />}
              {activeTab === 'settings' && <ProfileSettings />}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileInfo({ user }: { user: any }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">Личная информация</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Имя</label>
            <p className="font-medium">{user.displayName}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Роль</label>
            <p className="font-medium">{user.role}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-4">Статистика</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Проектов создано</span>
            <span className="font-bold text-primary">0</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Участий в проектах</span>
            <span className="font-bold text-primary">0</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Дата регистрации</span>
            <span className="font-bold text-primary">-</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileProjects() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">Мои проекты</h4>
        <button className="bg-blue-300 text-white px-4 py-2 rounded-lg hover:bg-blue-300/90 transition-colors">
          + Создать проект
        </button>
      </div>
      
      <div className="text-center py-12 text-gray-500">
        <p>У вас пока нет проектов</p>
        <button className="mt-4 bg-blue-300 text-white px-6 py-2 rounded-lg hover:bg-blue-300/90 transition-colors">
          Создать первый проект
        </button>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Настройки аккаунта</h4>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Смена пароля
          </label>
          <div className="space-y-4 max-w-md">
            <input
              type="password"
              placeholder="Текущий пароль"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Подтвердите новый пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="bg-blue-300 text-white px-6 py-2 rounded-lg hover:bg-blue-300/90 transition-colors">
              Обновить пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}