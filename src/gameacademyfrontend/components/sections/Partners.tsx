'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  type: string;
  projects: number;
}

export default function Partners() {
  const partners: Partner[] = [
    {
      id: 1,
      name: "Яндекс",
      logo: "/partners/yandex.png",
      description: "Крупнейшая российская IT-компания, лидер в области поисковых технологий и интернет-сервисов",
      website: "https://yandex.ru",
      type: "Технологический партнер",
      projects: 8
    },
    {
      id: 2,
      name: "VK",
      logo: "/partners/vk.png",
      description: "Ведущая технологическая компания, развивающая экосистему сервисов",
      website: "https://vk.com",
      type: "Образовательный партнер",
      projects: 5
    },
    {
      id: 3,
      name: "1C",
      logo: "/partners/1c.png",
      description: "Ведущий разработчик программного обеспечения для бизнеса",
      website: "https://1c.ru",
      type: "Технологический партнер",
      projects: 3
    }
  ];

  return (
    <div id="partners" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Партнёры</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          ИТИС КИРВИ сотрудничает с ведущими компаниями и научными организациями, 
          предоставляя студентам возможности для практики, стажировок и участия в индустриальных проектах.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-shadow"
          >
            <div className="relative h-20 mb-6">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
            <span className="inline-block bg-blue-300/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
              {partner.type}
            </span>
            
            <p className="text-gray-600 mb-4 line-clamp-3">{partner.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Совместных проектов:</span>
              <span className="font-semibold">{partner.projects}</span>
            </div>
            
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Посетить сайт
              <span>↗</span>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Статистика партнерств */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 bg-blue-300 text-white rounded-xl p-8"
      >
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-primary/80">Компаний-партнеров</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-primary/80">Совместных проектов</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">100+</div>
            <div className="text-primary/80">Студентов на стажировках</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">3+</div>
            <div className="text-primary/80">Года сотрудничества</div>
          </div>
        </div>
      </motion.div>

      {/* Призыв к действию */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-12"
      >
        <h3 className="text-2xl font-semibold mb-4">Хотите стать партнером?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Предложите совместный проект, стажировки для студентов или образовательные инициативы.
        </p>
        <button className="bg-blue-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors">
          Стать партнером
        </button>
      </motion.div>
    </div>
  );
}