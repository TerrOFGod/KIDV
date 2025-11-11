/* eslint-disable @typescript-eslint/no-unused-vars */
// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import NewsManagement from '@/components/features/admin/NewsManagement';
import PortfolioManagement from '@/components/features/admin/PortfolioManagement';
import ProjectsManagement from '@/components/features/admin/ProjectsManagement';
import StaffManagement from '@/components/features/admin/StaffManagement';
import UsersManagement from '@/components/features/admin/UsersManagement';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  //useEffect(() => {
    //if (!isAuthenticated || user?.role !== 'Admin') {
      //router.push('/');
    //}
  //}, [isAuthenticated, user, router]);

  //if (!isAuthenticated || user?.role !== 'Admin') {
    //return (
      //<div className="min-h-screen flex items-center justify-center">
        //<div className="text-center">
          //<h2 className="text-2xl font-bold mb-4">Доступ запрещен</h2>
          //<p className="text-gray-600">Требуются права администратора</p>
       //</div>
      //</div>
    //);
  //}

  const adminTabs = [
    { id: 'dashboard', label: 'Дашборд', icon: '📊' },
    { id: 'users', label: 'Пользователи', icon: '👥' },
    { id: 'news', label: 'Блог', icon: '📝' },
    { id: 'portfolio', label: 'Портфолио', icon: '💼' },
    { id: 'projects', label: 'Проекты', icon: '🚀' },
    { id: 'staff', label: 'Команда', icon: '👥' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
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
            {/* Заголовок админки */}
            <div className="bg-blue-300 text-white p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Админ-панель</h1>
                  <p className="text-primary/80 text-lg">Управление платформой</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">Администратор</p>
                  <p className="font-semibold">{user?.displayName}</p>
                </div>
              </div>
            </div>

            {/* Основной контент */}
            <div className="flex">
              {/* Боковая панель */}
              <div className="w-64 bg-gray-50 border-r border-gray-200">
                <nav className="p-4 space-y-2">
                  {adminTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-300 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Контент */}
              <div className="flex-1 p-8">
                {activeTab === 'dashboard' && <AdminDashboard />}
                {activeTab === 'users' && <UsersManagement />}
                {activeTab === 'news' && <NewsManagement />}
                {activeTab === 'portfolio' && <PortfolioManagement />}
                {activeTab === 'projects' && <ProjectsManagement />}
                {activeTab === 'staff' && <StaffManagement />}
                {activeTab === 'settings' && <AdminSettings />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const stats = [
    { label: 'Всего пользователей', value: '1,234', change: '+12%' },
    { label: 'Активных проектов', value: '89', change: '+5%' },
    { label: 'Новых за неделю', value: '34', change: '+8%' },
    { label: 'Онлайн сейчас', value: '56', change: '+3%' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Обзор системы</h2>
      
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Быстрые действия */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Добавить пользователя', description: 'Создать нового пользователя', action: '➕' },
          { title: 'Модерация проектов', description: 'Проверить новые проекты', action: '👁️' },
          { title: 'Системные настройки', description: 'Настройки платформы', action: '⚙️' },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <span className="text-2xl">{item.action}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <button className="w-full bg-blue-300 text-white py-2 rounded-lg hover:bg-blue-300/90 transition-colors">
              Перейти
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Настройки системы</h2>
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Компонент настроек системы</p>
      </div>
    </div>
  );
}