/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/StaffForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StaffMember, Position, Contact, Level, PositionType, StaffStat, StaffSkill, Subskill, StaffAchievement } from '@/types/staff';

export default function StaffForm({ 
  member, 
  onSave, 
  onClose 
}: {
  member: StaffMember | null;
  onSave: (data: StaffMember) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<StaffMember>({
    name: member?.name || '',
    positions: member?.positions || [],
    educationLevel: member?.educationLevel || '',
    researchPosition: member?.researchPosition || '',
    photo: member?.photo || '',
    bio: member?.bio || '',
    stats: member?.stats || [],
    skills: member?.skills || [],
    achievements: member?.achievements || [],
    tags: member?.tags || [],
    contact: member?.contact || [],
  });

  const [newTag, setNewTag] = useState('');
  const [newPosition, setNewPosition] = useState<Position>({ type: 'Научно-педагогический работник', value: '' });
  const [newContact, setNewContact] = useState<Contact>({ title: '', value: '' });
  const [newStat, setNewStat] = useState<StaffStat>({ label: '', value: 0 });
  const [newSkill, setNewSkill] = useState<StaffSkill>({ 
    name: '', 
    level: 'Junior',
    description: '',
    subskills: []
  });
  const [newSubskill, setNewSubskill] = useState<Subskill>({ name: '', description: '' });
  const [newAchievement, setNewAchievement] = useState<StaffAchievement>({ 
    title: '', 
    icon: '', 
    description: '' 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.error(formData);
    onSave(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const addPosition = () => {
    if (newPosition.value.trim()) {
      setFormData(prev => ({
        ...prev,
        positions: [...(prev.positions || []), { ...newPosition }]
      }));
      setNewPosition({ type: 'Научно-педагогический работник', value: '' });
    }
  };

  const removePosition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      positions: prev.positions?.filter((_, i) => i !== index) || []
    }));
  };

  const addContact = () => {
    if (newContact.title.trim() && newContact.value.trim()) {
      setFormData(prev => ({
        ...prev,
        contact: [...(prev.contact || []), { ...newContact }]
      }));
      setNewContact({ title: '', value: '' });
    }
  };

  const removeContact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contact: prev.contact?.filter((_, i) => i !== index) || []
    }));
  };

  const addStat = () => {
    if (newStat.label.trim()) {
      setFormData(prev => ({
        ...prev,
        stats: [...(prev.stats || []), { ...newStat }]
      }));
      setNewStat({ label: '', value: 0 });
    }
  };

  const removeStat = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats?.filter((_, i) => i !== index) || []
    }));
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), { ...newSkill }]
      }));
      setNewSkill({ name: '', level: 'Junior', description: '', subskills: [] });
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index) || []
    }));
  };

  const addSubskill = () => {
    if (newSubskill.name.trim()) {
      setNewSkill(prev => ({
        ...prev,
        subskills: [...(prev.subskills || []), { ...newSubskill }]
      }));
      setNewSubskill({ name: '', description: '' });
    }
  };

  const removeSubskill = (index: number) => {
    setNewSkill(prev => ({
      ...prev,
      subskills: (prev.subskills || []).filter((_, i) => i !== index)
    }));
  };

  const addAchievement = () => {
    if (newAchievement.title.trim() && newAchievement.icon.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...(prev.achievements || []), { ...newAchievement }]
      }));
      setNewAchievement({ title: '', icon: '', description: '' });
    }
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements?.filter((_, i) => i !== index) || []
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
            {member ? 'Редактирование сотрудника' : 'Новый сотрудник'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Полное имя *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Уровень образования *
              </label>
              <input
                type="text"
                value={formData.educationLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, educationLevel: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Научная должность
              </label>
              <input
                type="text"
                value={formData.researchPosition || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, researchPosition: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL фотографии
              </label>
              <input
                type="url"
                value={formData.photo || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Биография
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Должности */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Должности *
            </label>
            <div className="space-y-3 mb-4">
              {formData.positions?.map((position, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <span className="font-medium">{position.value}</span>
                    <span className="ml-2 text-sm text-gray-600">({position.type})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePosition(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Тип должности</label>
                <select
                  value={newPosition.type}
                  onChange={(e) => setNewPosition(prev => ({ ...prev, type: e.target.value as PositionType }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Научно-педагогический работник">Научно-педагогический работник</option>
                  <option value="Профессорско-преподавательский состав">Профессорско-преподавательский состав</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Название должности</label>
                <input
                  type="text"
                  value={newPosition.value}
                  onChange={(e) => setNewPosition(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={addPosition}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Добавить должность
                </button>
              </div>
            </div>
          </div>

          {/* Контакты */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Контакты
            </label>
            <div className="space-y-3 mb-4">
              {formData.contact?.map((contact, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <span className="font-medium">{contact.title}:</span>
                    <span className="ml-2 text-gray-600">{contact.value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeContact(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Тип контакта</label>
                <input
                  type="text"
                  value={newContact.title}
                  onChange={(e) => setNewContact(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Email, Telegram, GitHub"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Значение</label>
                <input
                  type="text"
                  value={newContact.value}
                  onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="example@mail.com, @username"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={addContact}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Добавить контакт
                </button>
              </div>
            </div>
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

          {/* Статистика */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Статистика
            </label>
            <div className="space-y-3 mb-4">
              {formData.stats?.map((stat, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <span className="font-medium">{stat.label}</span>
                    <span className="ml-2 text-gray-600">({stat.value})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStat(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Название</label>
                <input
                  type="text"
                  value={newStat.label}
                  onChange={(e) => setNewStat(prev => ({ ...prev, label: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Значение</label>
                <input
                  type="number"
                  value={newStat.value}
                  onChange={(e) => setNewStat(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={addStat}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Добавить статистику
                </button>
              </div>
            </div>
          </div>

          {/* Навыки */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Навыки
            </label>
            <div className="space-y-4 mb-4">
              {formData.skills?.map((skill, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-sm text-gray-600">Уровень: {skill.level}</p>
                      {skill.description && (
                        <p className="text-sm mt-1">{skill.description}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                  {skill.subskills && skill.subskills.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium mb-1">Поднавыки:</h5>
                      <div className="flex flex-wrap gap-1">
                        {skill.subskills.map((subskill, subIndex) => (
                          <span
                            key={subIndex}
                            className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {subskill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Название навыка</label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Уровень</label>
                  <select
                    value={newSkill.level}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value as Level }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Middle">Middle</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Описание</label>
                <textarea
                  value={newSkill.description || ''}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Поднавыки */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Поднавыки</label>
                <div className="space-y-2 mb-2">
                  {newSkill.subskills?.map((subskill, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div>
                        <span className="font-medium">{subskill.name}</span>
                        {subskill.description && (
                          <span className="ml-2 text-gray-600">- {subskill.description}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubskill(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newSubskill.name}
                    onChange={(e) => setNewSubskill(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Название поднавыка"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="text"
                    value={newSubskill.description || ''}
                    onChange={(e) => setNewSubskill(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Описание"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={addSubskill}
                      className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                    >
                      Добавить поднавык
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={addSkill}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Добавить навык
              </button>
            </div>
          </div>

          {/* Достижения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Достижения
            </label>
            <div className="space-y-4 mb-4">
              {formData.achievements?.map((achievement, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{achievement.icon}</span>
                        <h4 className="font-medium">{achievement.title}</h4>
                      </div>
                      <p className="text-sm mt-1">{achievement.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAchievement(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Название</label>
                  <input
                    type="text"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Иконка (название)</label>
                  <input
                    type="text"
                    value={newAchievement.icon}
                    onChange={(e) => setNewAchievement(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="FaUpload, FaTrophy и т.д."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Описание</label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="button"
                onClick={addAchievement}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Добавить достижение
              </button>
            </div>
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
              {member ? 'Обновить' : 'Создать'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}