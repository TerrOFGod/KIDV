// components/admin/PortfolioManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '@/types/portfolio';
import PortfolioForm from './forms/PortfolioForm';
import axios from 'axios';

export default function PortfolioManagement() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      // Mock data
      /*
      const mockData: PortfolioItem[] = [
        {
          _id: '1',
          slug: 'ai-vision-system',
          title: 'AI Vision System',
          category: 'Computer Vision',
          image: '/portfolio/ai-vision.jpg',
          description: 'Система компьютерного зрения для медицинской диагностики',
          year: 2024,
          hallOfFame: true,
          tags: ['AI', 'Computer Vision', 'Medical']
        }
      ];
      setPortfolio(mockData);
      */
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_API}/portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolio(data);
      setError('');
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Не удалось загрузить портфолио');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (portfolioData: PortfolioItem) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      if (editingItem) {
        // Update existing
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL_API}/portfolio/${editingItem._id}`,
          portfolioData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPortfolio(prev => prev.map(item => 
          item._id === editingItem._id ? portfolioData : item
        ));
      } else {
        // Create new
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL_API}/portfolio`,
          portfolioData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPortfolio(prev => [...prev, data]);
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      alert('Ошибка при сохранении проекта');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL_API}/portfolio/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPortfolio(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      alert('Ошибка при удалении проекта');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление портфолио</h2>
          <p className="text-gray-600">Проекты кафедры и достижения</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Новый проект</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего проектов</h3>
          <div className="text-2xl font-bold text-gray-900">{portfolio.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">В Hall of Fame</h3>
          <div className="text-2xl font-bold text-gray-900">
            {portfolio.filter(item => item.hallOfFame).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Категорий</h3>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(portfolio.map(item => item.category)).size}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">За этот год</h3>
          <div className="text-2xl font-bold text-gray-900">
            {portfolio.filter(item => item.year === new Date().getFullYear()).length}
          </div>
        </div>
      </div>

      {/* Сетка проектов */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray-200 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.hallOfFame && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                  ★ Hall of Fame
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{item.year}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setIsModalOpen(true);
                    }}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(item._id!)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {portfolio.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">Нет проектов в портфолио. Добавьте первый!</p>
        </div>
      )}

      {/* Модальное окно для портфолио (аналогично NewsForm) */}
      <AnimatePresence>
        {isModalOpen && (
          <PortfolioForm
            item={editingItem}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
