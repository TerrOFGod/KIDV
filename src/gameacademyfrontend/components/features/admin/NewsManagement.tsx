/* eslint-disable @typescript-eslint/no-unused-vars */
// components/admin/NewsManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NewsItem } from '@/types/news';
import NewsForm from './forms/NewsForm';
import axios from 'axios';

export default function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      /*
      const mockNews: NewsItem[] = [
        {
          _id: '1',
          slug: 'how-to-win-hackathon',
          title: 'Как выиграть хакатон',
          category: 'Соревнования',
          image: '/blog/hackathon.jpg',
          date: '2024-03-15',
          markdown: 'Содержание статьи...',
          author: { name: 'Анна Петрова', slug: 'anna-petrova' },
          tags: ['хакатон', 'советы', 'победа']
        }
      ];
      setNews(mockNews);
      */
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_API}/news`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNews(data);
      setError('');
    } catch (error) {
      setError('Не удалось загрузить список новостей');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newsData: NewsItem) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      if (editingNews) {
        // Update existing
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL_API}/news/${editingNews._id}`,
          newsData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNews(prev => prev.map(item => 
          item._id === editingNews._id ? newsData : item
        ));
      } else {
        // Create new
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL_API}/news`,
          newsData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNews(prev => [...prev, { ...newsData, data }]);
      }
      setIsModalOpen(false);
      setEditingNews(null);
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Ошибка при сохранении поста');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту запись?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL_API}/news/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNews(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Ошибка при удалении новости');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление блогом</h2>
          <p className="text-gray-600">Создание и редактирование статей блога</p>
        </div>
        <button
          onClick={() => {
            setEditingNews(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Новая статья</span>
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
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего статей</h3>
          <div className="text-2xl font-bold text-gray-900">{news.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Категорий</h3>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(news.map(item => item.category)).size}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Тегов</h3>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(news.flatMap(item => item.tags)).size}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">За этот месяц</h3>
          <div className="text-2xl font-bold text-gray-900">
            {news.filter(item => {
              const itemDate = new Date(item.date);
              const now = new Date();
              return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
            }).length}
          </div>
        </div>
      </div>

      {/* Таблица статей */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статья
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Теги
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags!.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{item.tags!.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingNews(item);
                      setIsModalOpen(true);
                    }}
                    className="text-black hover:text-black/80 mr-4"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(item._id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Нет статей. Создайте первую!</p>
          </div>
        )}
      </div>

      {/* Модальное окно для редактирования/создания */}
      <AnimatePresence>
        {isModalOpen && (
          <NewsForm
            news={editingNews}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingNews(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
