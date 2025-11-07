'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { div } from 'framer-motion/client';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  photo: string;
  tags: string[];
  bio: string;
  achievements: string[];
  contact: string;
}

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

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filter, setFilter] = useState('all');

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Кугуракова Влада Владимировна",
      position: "Руководитель кафедры",
      photo: "/team/kugurakova.jpg",
      tags: ["Руководство", "Исследования", "VR/AR"],
      bio: "Опыт работы в IT-индустрии более 10 лет. Специалист в области разработки видеоигр и иммерсивных технологий.",
      achievements: [
        "Основатель кафедры ИРВИ",
        "Автор 20+ научных публикаций",
        "Руководитель 10+ успешных проектов"
      ],
      contact: "vlada.kugurakova@gmail.com"
    },
    {
      id: 2,
      name: "Петров Алексей",
      position: "Старший преподаватель",
      photo: "/team/petrov.jpg",
      tags: ["Unity", "C#", "Game Design"],
      bio: "Специалист в области игрового дизайна и разработки на Unity.",
      achievements: [
        "Ведущий разработчик 5 коммерческих проектов",
        "Эксперт в области игровых механик"
      ],
      contact: "a.petrov@example.com"
    }
  ];

  const filters = [
    {id: 'all', label: "Все"}, 
    {id: 'Руководство', label: "Руководство"}, 
    {id: 'Преподаватели', label: "Преподаватели"}, 
    {id: 'Исследователи', label: "Исследователи"}
    ];

    const filteredItems = filter === 'all' 
    ? teamMembers 
    : teamMembers.filter(item => item.tags.includes(filter));

  return (
    <div id="team" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Команда</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          За каждым проектом — преподаватели, наставники и исследователи, 
          вдохновляющие и направляющие студентов.
        </p>
      </motion.div>

      {/* Фильтры */}
      <motion.div         
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-4 mb-8">
        {filters.map((filterItem) => (
          <button
            key={filterItem.id}
            onClick={() => setFilter(filterItem.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === filterItem.id
                ? 'bg-blue-300 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
          >
            {filterItem.label}
          </button>
        ))}
      </motion.div>

      {/* Сетка команды */}
  <motion.div         
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    layout
    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >

    <AnimatePresence mode="popLayout">
    {filteredItems.map((member, index) => (
      <motion.div
        key={member.id}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col" // Добавлен flex flex-col
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute bottom-4 left-4 z-20 text-white">
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm opacity-90">{member.position}</p>
          </div>
        </div>
      
        <div className="p-6 flex flex-col flex-1"> {/* Добавлен flex flex-col и flex-1 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {member.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-blue-300/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-600 line-clamp-3 flex-1 mb-4">{member.bio}</p> {/* Добавлен flex-1 и mb-4 */}
        
          <div className="mt-auto flex items-center justify-between"> {/* Добавлен mt-auto */}
            <span className="text-sm text-gray-500">
              {member.achievements.length} достижений
            </span>
            <motion.button 
              className="text-primary font-semibold text-sm cursor-pointer"
              onClick={() => setSelectedMember(member)}
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

      {/* Модальное окно сотрудника */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="text-3xl font-bold mb-2">{selectedMember.name}</h3>
                <p className="text-xl text-primary mb-6">{selectedMember.position}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedMember.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-blue-300/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Биография</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Достижения</h4>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold mb-2">Контакты</h4>
                  <p className="text-gray-700">{selectedMember.contact}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}