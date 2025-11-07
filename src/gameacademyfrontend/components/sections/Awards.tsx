'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Award {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
  place: number;
  participants: string[];
  tags: string[];
}

export default function Awards() {
  const awards: Award[] = [
    {
      id: 1,
      title: "Цифровой прорыв 2024",
      year: 2024,
      description: "Первое место в номинации 'Лучшее AI-решение' за разработку системы компьютерного зрения",
      image: "/awards/digital-breakthrough.jpg",
      place: 1,
      participants: ["Анна Петрова", "Максим Иванов", "Елена Сидорова"],
      tags: ["Хакатон", "AI", "Компьютерное зрение"]
    },
    {
      id: 2,
      title: "GameDev Championship 2023",
      year: 2023,
      description: "Гран-при за инновационную игровую механику в проекте 'Neon Dreams'",
      image: "/awards/gamedev-championship.jpg",
      place: 1,
      participants: ["Дмитрий Козлов", "Ольга Новикова"],
      tags: ["GameDev", "Инновации", "Геймдизайн"]
    },
    {
      id: 3,
      title: "IT-Planet 2023",
      year: 2023,
      description: "Второе место в категории 'Мобильная разработка'",
      image: "/awards/it-planet.jpg",
      place: 2,
      participants: ["Иван Смирнов", "Мария Кузнецова"],
      tags: ["Мобильная разработка", "Кросс-платформенность"]
    }
  ];

  const stats = [
    { number: "15+", label: "Побед в конкурсах" },
    { number: "50+", label: "Участников" },
    { number: "3", label: "Года успеха" },
    { number: "1M+", label: "Призовые фонды" }
  ];

  return (
    <div id="awards" className="container mx-auto px-4 py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Наши достижения</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы гордимся победами наших студентов и проектов на региональных и всероссийских соревнованиях.
        </p>
      </motion.div>

      {/* Статистика */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Награды */}
      <div className="space-y-8">
        {awards.map((award, index) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-300 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {award.year}
                </div>
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold">{award.title}</h3>
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-300 text-white rounded-full text-lg font-bold">
                    {award.place}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{award.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Участники:</h4>
                  <div className="flex flex-wrap gap-2">
                    {award.participants.map((participant, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {award.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-blue-300/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Призыв к действию */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-12"
      >
        <h3 className="text-2xl font-semibold mb-4">Хотите присоединиться к нашим победам?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Присоединяйтесь к нашей команде и станьте частью успешных проектов.
        </p>
        <button className="bg-blue-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors mr-4">
          Участвовать в конкурсах
        </button>
        <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-300/10 transition-colors">
          Предложить проект
        </button>
      </motion.div>
    </div>
  );
}