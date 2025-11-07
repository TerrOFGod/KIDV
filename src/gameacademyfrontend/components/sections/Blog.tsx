'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
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

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Как выиграть хакатон: советы от победителей",
      excerpt: "Практические рекомендации от наших студентов, победивших на всероссийском хакатоне Digital Breakthrough.",
      content: "Полный текст статьи о том, как правильно готовиться к хакатонам...",
      date: "15 марта 2024",
      author: "Анна Петрова",
      category: "Соревнования",
      image: "/blog/hackathon.jpg",
      readTime: "5 мин",
      tags: ["Хакатон", "Советы", "Победа"]
    },
    {
      id: 2,
      title: "Тенденции в разработке игр 2024",
      excerpt: "Обзор ключевых трендов в игровой индустрии и технологиях разработки.",
      content: "В этом году мы наблюдаем несколько интересных тенденций...",
      date: "10 марта 2024",
      author: "Максим Иванов",
      category: "Аналитика",
      image: "/blog/trends.jpg",
      readTime: "7 мин",
      tags: ["Тренды", "GameDev", "Технологии"]
    }
  ];

    const filteredItems = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(item => item.category === selectedCategory);

  const categories = [
    {id: 'all', label: "Все"}, 
    {id: 'Соревнования', label: "Соревнования"}, 
    {id: 'Аналитика', label: "Аналитика"}, 
    {id: 'Проекты', label: "Проекты"}, 
    {id: 'Обучение', label: "Обучение"}
    ];

  return (
    <div id="blog" className="container mx-auto px-4 py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Блог</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Последние новости, статьи и советы от нашей команды и студентов.
        </p>
      </motion.div>

      {/* Категории */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-300 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Сетка постов */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
        <AnimatePresence mode="popLayout">
        {filteredItems.map((post, index) => (
          <motion.article
            key={post.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group flex flex-col" // Добавлен flex flex-col
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-blue-300 text-white px-3 py-1 rounded-full text-sm">
                {post.category}
              </div>
            </div>
      
            <div className="p-6 flex flex-col flex-1"> {/* Добавлен flex flex-col flex-1 */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
        
              <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
        
              <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p> {/* Добавлен flex-1 */}
        
              <div className="flex items-center justify-between mt-auto"> {/* Добавлен mt-auto */}
                <span className="text-sm text-gray-500">Автор: {post.author}</span>
                <motion.button 
                  className="text-primary font-semibold text-sm cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                  whileHover={{ x: 5 }}
                >
                  Читать →
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
        </AnimatePresence>
      </motion.div>

      {/* Кнопка "Все статьи" */}
      <div className="text-center mt-12">
        <button className="bg-blue-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors">
          Все статьи
        </button>
      </div>

      {/* Модальное окно поста */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
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
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-4 bg-blue-300 text-white px-3 py-1 rounded-full text-sm">
                  {selectedPost.category}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{selectedPost.date}</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-600">Автор: {selectedPost.author}</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {selectedPost.excerpt}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPost.content}
                  </p>
                </div>
                
                <div className="border-t mt-8 pt-6">
                  <h4 className="text-lg font-semibold mb-4">Понравилась статья?</h4>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                      <span>👍</span> Полезно
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                      <span>💬</span> Комментировать
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                      <span>↗</span> Поделиться
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}