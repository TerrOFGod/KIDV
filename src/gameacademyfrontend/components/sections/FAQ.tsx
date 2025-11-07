'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
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

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Как попасть в проекты кафедры?",
      answer: "Достаточно быть студентом КФУ и проявить инициативу — мы открыты к новым участникам с 1 курса. Посетите наше собрание, ознакомьтесь с текущими проектами и выберите подходящий для вас.",
      category: "поступление"
    },
    {
      id: 2,
      question: "Можно ли пройти практику на кафедре?",
      answer: "Да, мы организуем учебную и производственную практику в рамках командной проектной работы. Студенты работают над реальными проектами под руководством опытных наставников.",
      category: "обучение"
    },
    {
      id: 3,
      question: "Что нужно, чтобы поступить?",
      answer: "Подавайте документы в КФУ по направлению 'Информационные системы и технологии'. Подробности о вступительных испытаниях и сроках подачи документов — на сайте приёмной комиссии КФУ.",
      category: "поступление"
    },
    {
      id: 4,
      question: "Какие технологии изучаются?",
      answer: "В зависимости от направления: Python, C#, JavaScript, Unity, Unreal Engine, Docker, React, Git, SQL, ML, компьютерное зрение, VR/AR разработка и другие современные технологии.",
      category: "обучение"
    },
    {
      id: 5,
      question: "Есть ли бюджетные места?",
      answer: "Да, на направлении 'Информационные системы и технологии' предусмотрены бюджетные места. Количество мест зависит от контрольных цифр приема текущего года.",
      category: "поступление"
    },
    {
      id: 6,
      question: "Какие перспективы трудоустройства?",
      answer: "Наши выпускники работают в ведущих IT-компаниях России и мира: Яндекс, VK, 1C, GameDev студиях и стартапах. Средняя зарплата выпускников составляет 120K+ рублей.",
      category: "карьера"
    }
  ];

  const categories = [
    { id: 'all', label: 'Все вопросы' },
    { id: 'поступление', label: 'Поступление' },
    { id: 'обучение', label: 'Обучение' },
    { id: 'карьера', label: 'Карьера' }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const filteredItems = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div id="faq" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ответы на самые популярные вопросы о кафедре, обучении и перспективах.
        </p>
      </motion.div>

      {/* Категории */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-300 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* FAQ список */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="max-w-4xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(item.id)}
              >
                <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                <motion.span
                  animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                  className="flex-shrink-0 text-primary text-xl"
                >
                  ↓
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 border-t">
                      <p className="text-gray-700 leading-relaxed pt-4">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Дополнительная помощь */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-16"
      >
        <div className="bg-blue-300 text-white rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Не нашли ответ на свой вопрос?</h3>
          <p className="mb-6 opacity-90">
            Свяжитесь с нами напрямую, и мы с радостью ответим на все ваши вопросы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Написать в Telegram
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Отправить email
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}