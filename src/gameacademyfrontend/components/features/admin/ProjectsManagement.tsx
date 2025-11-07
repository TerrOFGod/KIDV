// components/admin/ProjectsManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentProject } from '@/types/studentProject';
import ProjectForm from './forms/ProjectForm';

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<StudentProject | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'archived'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Mock data
      const mockData: StudentProject[] = [
        {
          _id: '1',
          slug: 'student-game-project',
          title: 'Student Game Project',
          description: 'Инновационная игра разработанная студентами',
          category: 'Game Development',
          image: '/projects/game-project.jpg',
          year: 2024,
          authors: [
            { name: 'Иван Иванов', slug: 'ivan-ivanov', role: 'Developer' },
            { name: 'Мария Петрова', slug: 'maria-petrova', role: 'Designer' }
          ],
          tags: ['Unity', 'C#', 'Game Design'],
          status: 'active',
          githubUrl: 'https://github.com/example',
          demoUrl: 'https://demo.example.com'
        }
      ];
      setProjects(mockData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status === filter
  );

  const handleSave = async (data: StudentProject) => {
    try {
      if (editingProject) {
        setProjects(prev => prev.map(item => 
          item._id === editingProject._id ? data : item
        ));
      } else {
        setProjects(prev => [...prev, { ...data, _id: Date.now().toString() }]);
      }
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
      setProjects(prev => prev.filter(item => item._id !== id));
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление проектами</h2>
          <p className="text-gray-600">Студенческие проекты и работы</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Новый проект</span>
        </button>
      </div>

      {/* Фильтры и статистика */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex space-x-2">
          {[
            { id: 'all' as const, label: 'Все', count: projects.length },
            { id: 'active' as const, label: 'Активные', count: projects.filter(p => p.status === 'active').length },
            { id: 'completed' as const, label: 'Завершенные', count: projects.filter(p => p.status === 'completed').length },
            { id: 'archived' as const, label: 'Архив', count: projects.filter(p => p.status === 'archived').length },
          ].map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterItem.id
                  ? 'bg-blue-300 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterItem.label} ({filterItem.count})
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500">
          Показано: {filteredProjects.length} из {projects.length}
        </div>
      </div>

      {/* Сетка проектов */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-40 bg-gray-200 relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white ${
                project.status === 'active' ? 'bg-green-500' :
                project.status === 'completed' ? 'bg-blue-500' :
                'bg-gray-500'
              }`}>
                {project.status === 'active' ? 'Активный' :
                 project.status === 'completed' ? 'Завершен' : 'Архив'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <span>{project.year} год</span>
                <span>{project.authors.length} участников</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      Demo
                    </a>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsModalOpen(true);
                    }}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    Редакт.
                  </button>
                  <button
                    onClick={() => handleDelete(project._id!)}
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

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">
            {projects.length === 0 
              ? 'Нет студенческих проектов. Добавьте первый!' 
              : `Нет проектов в категории "${filter}"`}
          </p>
        </div>
      )}

      {/* Модальное окно для проектов 
      */}

      <AnimatePresence>
        {isModalOpen && (
          <ProjectForm
            project={editingProject}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProject(null);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Компонент ProjectForm будет аналогичен предыдущим формам