// components/admin/StaffManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StaffMember } from '@/types/staff';
import StaffForm from './forms/StaffForm';

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      // Mock data
      const mockData: StaffMember[] = [
        {
          _id: '1',
          slug: 'vlada-kugurakova',
          name: 'Кугуракова Влада Владимировна',
          position: 'Руководитель кафедры',
          photo: '/team/kugurakova.jpg',
          title: 'Доцент',
          rarity: 'LEGENDARY',
          email: 'vlada.kugurakova@gmail.com',
          telegram: '@vladakugurakova',
          bio: 'Опыт работы в IT-индустрии более 10 лет...',
          researchInterests: ['VR/AR', 'Game Development', 'Computer Vision'],
          tags: ['Руководство', 'VR/AR', 'Исследования']
        }
      ];
      setStaff(mockData);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: StaffMember) => {
    try {
      if (editingMember) {
        setStaff(prev => prev.map(item => 
          item._id === editingMember._id ? data : item
        ));
      } else {
        setStaff(prev => [...prev, { ...data, _id: Date.now().toString() }]);
      }
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving staff member:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
      setStaff(prev => prev.filter(item => item._id !== id));
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление командой</h2>
          <p className="text-gray-600">Преподаватели и сотрудники кафедры</p>
        </div>
        <button
          onClick={() => {
            setEditingMember(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Новый сотрудник</span>
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего сотрудников</h3>
          <div className="text-2xl font-bold text-gray-900">{staff.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Преподавателей</h3>
          <div className="text-2xl font-bold text-gray-900">
            {staff.filter(m => m.position.includes('преподаватель')).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">LEGENDARY</h3>
          <div className="text-2xl font-bold text-gray-900">
            {staff.filter(m => m.rarity === 'LEGENDARY').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Направлений</h3>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(staff.flatMap(m => m.researchInterests || [])).size}
          </div>
        </div>
      </div>

      {/* Таблица сотрудников */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сотрудник
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Должность
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Редкость
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Контакты
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={member.photo}
                        alt={member.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    member.rarity === 'LEGENDARY' ? 'bg-yellow-100 text-yellow-800' :
                    member.rarity === 'RARE' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {member.rarity === 'LEGENDARY' ? 'LEGENDARY' :
                     member.rarity === 'RARE' ? 'RARE' : 'COMMON'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{member.email}</div>
                  <div>{member.telegram}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setIsModalOpen(true);
                    }}
                    className="text-primary hover:text-primary/80 mr-4"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(member._id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {staff.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Нет сотрудников. Добавьте первого!</p>
          </div>
        )}
      </div>

      {/* Модальное окно для сотрудников 
      */}

      <AnimatePresence>
        {isModalOpen && (
          <StaffForm
            member={editingMember}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingMember(null);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Компонент StaffForm будет аналогичен предыдущим формам