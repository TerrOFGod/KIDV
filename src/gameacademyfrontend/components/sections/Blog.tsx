/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NewsItem } from "@/types/news";
import newsData from "@/data/news";
import Link from "next/link";
import Image from "next/image";
import { createSearchComponent } from "../ui/AnimatedSearchComponent";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    let filtered = newsData;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered.slice(0, 3); // Limit to 3 for homepage
  }, [searchQuery]);


  const BlogSearch = createSearchComponent<NewsItem>({
    searchFields: ['title', 'category'],
        displayField: 'title',
        getDisplayValue: (post) => post.title,
        fieldLabels: {
          title: 'Название',
          category: 'Категория',
        },
        renderItem: (post, itemVariants) => (
          <motion.article
            key={post._id}
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
                src={post.image!}
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
                <span className="text-sm text-gray-500">Автор: {post.author?.name}</span>
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
        )
  });

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
        <h2 className="text-4xl font-bold mb-4">Блог</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Последние новости, статьи и советы от нашей команды и студентов.
        </p>
        </motion.div>

        {/* News Grid */}
        <BlogSearch 
          data={newsData}
          getItemTags={(post) => post.tags!}
          gridLayout="cards"
          animationType="scale"
          autoExtractTags={true}
          enablePagination={false}
          initialItemsToShow={3}
          itemsPerPage={3}
          maxItemsToShow={3}
          showLoadMoreButton={true}
          />

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/news"
            className="inline-flex items-center px-8 py-3 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors text-lg font-semibold"
          >
            Все посты
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

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
                  src={selectedPost.image!}
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
                  <span className="text-gray-600">Автор: {selectedPost.author?.name}</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags?.map(tag => (
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
    </section>
  );
}