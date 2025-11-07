// components/admin/PortfolioForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '@/types/portfolio';

export default function PortfolioForm({ 
  item, 
  onSave, 
  onClose 
}: {
  item: PortfolioItem | null;
  onSave: (data: PortfolioItem) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<PortfolioItem>({
    slug: item?.slug || '',
    title: item?.title || '',
    category: item?.category || '',
    image: item?.image || '',
    description: item?.description || '',
    releaseDate: item?.releaseDate || '',
    download: item?.download || '',
    phases: item?.phases || [],
    goals: item?.goals || [],
    features: item?.features || [],
    screenshots: item?.screenshots || [],
    hallOfFame: item?.hallOfFame || false,
    authors: item?.authors || [],
    year: item?.year || new Date().getFullYear(),
    markdown: item?.markdown || '',
    tags: item?.tags || [],
  });

  const [newTag, setNewTag] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newScreenshot, setNewScreenshot] = useState('');
  const [newAuthor, setNewAuthor] = useState({ name: '', slug: '', role: '' });
  const [newPhase, setNewPhase] = useState({ 
    title: '', 
    date: '', 
    description: '',
    skills: [] as Array<{ name: string; level: number }>
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Управление тегами
  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags!, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  // Управление целями
  const addGoal = () => {
    if (newGoal.trim() && !formData.goals?.includes(newGoal.trim())) {
      setFormData(prev => ({
        ...prev,
        goals: [...(prev.goals || []), newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (goalToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals?.filter(goal => goal !== goalToRemove)
    }));
  };

  // Управление фичами
  const addFeature = () => {
    if (newFeature.trim() && !formData.features?.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter(feature => feature !== featureToRemove)
    }));
  };

  // Управление скриншотами
  const addScreenshot = () => {
    if (newScreenshot.trim() && !formData.screenshots?.includes(newScreenshot.trim())) {
      setFormData(prev => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), newScreenshot.trim()]
      }));
      setNewScreenshot('');
    }
  };

  const removeScreenshot = (screenshotToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots?.filter(screenshot => screenshot !== screenshotToRemove)
    }));
  };

  // Управление авторами
  const addAuthor = () => {
    if (newAuthor.name.trim() && newAuthor.slug.trim()) {
      setFormData(prev => ({
        ...prev,
        authors: [...(prev.authors || []), { ...newAuthor }]
      }));
      setNewAuthor({ name: '', slug: '', role: '' });
    }
  };

  const removeAuthor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors?.filter((_, i) => i !== index)
    }));
  };

  // Управление фазами
  const addPhase = () => {
    if (newPhase.title.trim() && newPhase.date.trim()) {
      setFormData(prev => ({
        ...prev,
        phases: [...(prev.phases || []), { ...newPhase }]
      }));
      setNewPhase({ title: '', date: '', description: '', skills: [] });
    }
  };

  const removePhase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      phases: prev.phases?.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">
            {item ? 'Редактирование проекта' : 'Новый проект портфолио'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Год *
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата релиза
              </label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL основного изображения *
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ссылка для скачивания
            </label>
            <input
              type="url"
              value={formData.download}
              onChange={(e) => setFormData(prev => ({ ...prev, download: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Теги */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-300/10 text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Введите тег и нажмите Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Цели */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цели проекта
            </label>
            <div className="space-y-2 mb-2">
              {formData.goals?.map((goal, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{goal}</span>
                  <button
                    type="button"
                    onClick={() => removeGoal(goal)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                placeholder="Добавить цель"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addGoal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Особенности */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Особенности проекта
            </label>
            <div className="space-y-2 mb-2">
              {formData.features?.map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Добавить особенность"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Скриншоты */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Скриншоты (URL)
            </label>
            <div className="space-y-2 mb-2">
              {formData.screenshots?.map((screenshot, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="truncate">{screenshot}</span>
                  <button
                    type="button"
                    onClick={() => removeScreenshot(screenshot)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                value={newScreenshot}
                onChange={(e) => setNewScreenshot(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addScreenshot())}
                placeholder="URL скриншота"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addScreenshot}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Авторы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Авторы проекта
            </label>
            <div className="space-y-3 mb-4">
              {formData.authors?.map((author, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <div className="font-medium">{author.name}</div>
                    <div className="text-sm text-gray-600">Slug: {author.slug} | Роль: {author.role}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Имя</label>
                <input
                  type="text"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
                <input
                  type="text"
                  value={newAuthor.slug}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Роль</label>
                <input
                  type="text"
                  value={newAuthor.role}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={addAuthor}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Добавить автора
                </button>
              </div>
            </div>
          </div>

          {/* Фазы проекта */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Фазы разработки
            </label>
            <div className="space-y-4 mb-4">
              {formData.phases?.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{phase.title}</h4>
                      <p className="text-sm text-gray-600">{phase.date}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhase(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-sm">{phase.description}</p>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Название фазы</label>
                  <input
                    type="text"
                    value={newPhase.title}
                    onChange={(e) => setNewPhase(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Дата</label>
                  <input
                    type="date"
                    value={newPhase.date}
                    onChange={(e) => setNewPhase(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Описание</label>
                <textarea
                  value={newPhase.description}
                  onChange={(e) => setNewPhase(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="button"
                onClick={addPhase}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Добавить фазу
              </button>
            </div>
          </div>

          {/* Дополнительные настройки */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hallOfFame"
                checked={formData.hallOfFame}
                onChange={(e) => setFormData(prev => ({ ...prev, hallOfFame: e.target.checked }))}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="hallOfFame" className="ml-2 block text-sm text-gray-700">
                Включить в Hall of Fame
              </label>
            </div>
          </div>

          {/* Markdown контент */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Детальное описание (Markdown)
            </label>
            <textarea
              value={formData.markdown}
              onChange={(e) => setFormData(prev => ({ ...prev, markdown: e.target.value }))}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
            >
              {item ? 'Обновить' : 'Создать'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}