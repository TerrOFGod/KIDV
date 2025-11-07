'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Определяем типы для анимаций
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    }
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "AI Vision System",
      year: 2024,
      description: "Система компьютерного зрения для анализа медицинских изображений",
      tags: ["Python", "ML", "OpenCV"],
      category: "ai",
      featured: true
    },
    {
      id: 2,
      title: "Neon Dreams Game",
      year: 2024,
      description: "Иммерсивная игра в стиле киберпанк с продвинутой графикой",
      tags: ["Unity", "C#", "3D Graphics"],
      category: "gamedev",
      featured: true
    },
    {
      id: 3,
      title: "VR Learning Platform",
      year: 2023,
      description: "Образовательная платформа с использованием виртуальной реальности",
      tags: ["VR", "Education", "Unity"],
      category: "vr",
      featured: false
    },
  ];

  const filters = [
    { id: 'all', label: 'Все проекты' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'gamedev', label: 'Game Development' },
    { id: 'vr', label: 'VR/AR' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div id="projects" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Проекты</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Наша кафедра — не про теорию ради теории. Каждый проект здесь — это шаг в карьеру, 
          возможность применить знания на практике и создать что-то значимое.
        </p>
      </motion.div>

      {/* Фильтры с анимацией */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        layout
      >
        {filters.map((filterItem) => (
          <motion.button
            key={filterItem.id}
            onClick={() => setFilter(filterItem.id)}
            className={`px-6 py-3 rounded-full transition-colors ${
              filter === filterItem.id
                ? 'bg-blue-300 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            {filterItem.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Сетка проектов с анимацией фильтрации */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow ${
                project.featured ? 'ring-2 ring-primary' : ''
              }`}
              //onClick={() => setSelectedProject(project.id)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <motion.span 
                      className="bg-blue-300 text-white px-2 py-1 rounded text-xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Featured
                    </motion.span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <motion.span 
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{project.year}</span>
                  <motion.button 
                    className="text-primary font-semibold text-sm cursor-pointer"
                    onClick={() => setSelectedProject(project.id)}
                    whileHover={{ x: 5 }}
                  >
                    Подробнее →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Сообщение если нет проектов */}
      <AnimatePresence>
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-semibold mb-4">Проекты не найдены</h3>
            <p className="text-gray-600 mb-6">
              Попробуйте выбрать другую категорию или сбросить фильтры
            </p>
            <motion.button
              onClick={() => setFilter('all')}
              className="bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Показать все проекты
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Индикатор количества найденных проектов */}
      <motion.div 
        className="text-center mt-8 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={filteredProjects.length}
      >
        Найдено проектов: {filteredProjects.length}
      </motion.div>
    </div>
  );
}