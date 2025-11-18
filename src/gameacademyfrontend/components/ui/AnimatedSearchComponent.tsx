/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Базовые интерфейсы для конфигурации
interface SearchConfig<T> {
  searchFields: (keyof T)[];
  displayField: keyof T;
  getDisplayValue: (item: T) => string;
  renderItem?: (item: T, itemVariants: any) => React.ReactNode;
  getImageUrl?: (item: T) => string;
  getCategory?: (item: T) => string;
  getDate?: (item: T) => string;
  getReadTime?: (item: T) => string;
  getExcerpt?: (item: T) => string;
  getAuthor?: (item: T) => string;
  onItemClick?: (item: T) => void;
  // Поля для описания поисковых полей
  fieldLabels?: Record<string, string>;
}

interface AnimatedSearchComponentProps<T> {
  data: T[];
  availableTags?: string[];
  getItemTags: (item: T) => string[];
  searchConfig: SearchConfig<T>;
  className?: string;
  onFilterChange?: (filteredData: T[], searchTerm: string, selectedTags: string[]) => void;
  autoExtractTags?: boolean;
  gridLayout?: 'cards' | 'list' | 'custom';
  animationType?: 'scale' | 'fade' | 'slide';
  
  itemsPerPage?: number;
  enablePagination?: boolean;
  initialItemsToShow?: number;
  showLoadMoreButton?: boolean;
  maxItemsToShow?: number;
}

const createDefaultSearchConfig = <T,>(
  displayField: keyof T,
  searchFields?: (keyof T)[]
): SearchConfig<T> => ({
  searchFields: searchFields || [displayField],
  displayField,
  getDisplayValue: (item: T) => String(item[displayField]),
});

export default function AnimatedSearchComponent<T>({
  data,
  availableTags,
  getItemTags,
  searchConfig,
  className = '',
  onFilterChange,
  autoExtractTags = true,
  gridLayout = 'cards',
  animationType = 'scale',
  
  itemsPerPage = 12,
  enablePagination = false,
  initialItemsToShow = 12,
  showLoadMoreButton = true,
  maxItemsToShow = 0
}: AnimatedSearchComponentProps<T>) {
  // Автоматически извлекаем все уникальные теги из данных
  const allTagsFromData = useMemo(() => {
    if (!autoExtractTags) return [];
    
    const tagSet = new Set<string>();
    data.forEach(item => {
      const tags = getItemTags(item);
      tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [data, getItemTags, autoExtractTags]);

  const finalAvailableTags = useMemo(() => {
    if (availableTags && availableTags.length > 0) {
      const combined = [...availableTags, ...allTagsFromData];
      return Array.from(new Set(combined)).sort();
    }
    return allTagsFromData;
  }, [availableTags, allTagsFromData]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  
  // Состояния для пагинации и ограничений
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  
  // Состояния для интеллектуального поиска
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Генерируем подсказки для интеллектуального поиска
  const searchSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    
    const suggestions = [];
    const term = searchTerm.toLowerCase();
    
    // Подсказки для тегов (с префиксом #)
    const tagSuggestions = finalAvailableTags
      .filter(tag => 
        tag.toLowerCase().includes(term) && 
        !selectedTags.includes(tag)
      )
      .slice(0, 5)
      .map(tag => ({
        type: 'tag' as const,
        value: tag,
        display: `#${tag}`,
        count: data.filter(item => getItemTags(item).includes(tag)).length
      }));
    
    if (tagSuggestions.length > 0) {
      suggestions.push(...tagSuggestions);
    }
    
    // Подсказки для полей поиска
    const fieldSuggestions: {type: 'field', field: string, value: string, display: string}[] = [];
    
    searchConfig.searchFields.forEach(field => {
      const fieldName = String(field);
      const fieldLabel = searchConfig.fieldLabels?.[fieldName] || fieldName;
      
      // Собираем уникальные значения из этого поля
      const fieldValues = new Set<string>();
      data.forEach(item => {
        const value = item[field];
        if (value && String(value).toLowerCase().includes(term)) {
          fieldValues.add(String(value));
        }
      });
      
      // Добавляем подсказки для этого поля
      Array.from(fieldValues)
        .slice(0, 3)
        .forEach(value => {
          fieldSuggestions.push({
            type: 'field',
            field: fieldName,
            value: value,
            display: `${fieldLabel}: ${value}`
          });
        });
    });
    
    if (fieldSuggestions.length > 0) {
      suggestions.push(...fieldSuggestions.slice(0, 5));
    }
    
    return suggestions;
  }, [searchTerm, finalAvailableTags, selectedTags, data, getItemTags, searchConfig.searchFields, searchConfig.fieldLabels]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    resetPagination();
  };

  // Обработка выбора подсказки
  const handleSuggestionSelect = (suggestion: typeof searchSuggestions[0]) => {
    if (suggestion.type === 'tag') {
      // Добавляем тег в выбранные
      setSelectedTags(prev => [...prev, suggestion.value]);
      setSearchTerm('');
    } else {
      // Для полей - устанавливаем поисковый термин
      setSearchTerm(suggestion.value);
    }
    setIsSuggestionsOpen(false);
    resetPagination();
  };

  // Удаление отдельного тега
  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
    resetPagination();
  };

  // Очистка всех тегов
  const clearAllTags = () => {
    setSelectedTags([]);
    resetPagination();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    resetPagination();
  };

  const resetPagination = () => {
    setCurrentPage(1);
    setItemsToShow(initialItemsToShow);
  };

  // Фильтрация данных
  useEffect(() => {
    let results = data;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item =>
        searchConfig.searchFields.some(field => {
          const fieldValue = item[field];
          return String(fieldValue).toLowerCase().includes(term);
        })
      );
    }
    
    if (selectedTags.length > 0) {
      results = results.filter(item =>
        selectedTags.every(selectedTag =>
          getItemTags(item).includes(selectedTag)
        )
      );
    }
    
    setFilteredData(results);
    onFilterChange?.(results, searchTerm, selectedTags);
  }, [searchTerm, selectedTags, data, searchConfig.searchFields, getItemTags, onFilterChange]);

  // Рассчитываем данные для отображения с учетом ограничений
  const displayData = useMemo(() => {
    let result = filteredData;
    
    if (maxItemsToShow > 0 && result.length > maxItemsToShow) {
      result = result.slice(0, maxItemsToShow);
    }
    
    if (enablePagination) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      result = result.slice(startIndex, endIndex);
    } else if (!enablePagination && itemsToShow > 0) {
      result = result.slice(0, itemsToShow);
    }
    
    return result;
  }, [filteredData, enablePagination, currentPage, itemsPerPage, itemsToShow, maxItemsToShow]);

  // Пагинация
  const totalPages = enablePagination 
    ? Math.ceil(filteredData.length / itemsPerPage)
    : 0;

  const canLoadMore = !enablePagination && 
    itemsToShow < filteredData.length && 
    (maxItemsToShow === 0 || itemsToShow < maxItemsToShow);

  const handleLoadMore = () => {
    if (enablePagination) {
      setCurrentPage(prev => prev + 1);
    } else {
      setItemsToShow(prev => {
        const newValue = prev + itemsPerPage;
        return maxItemsToShow > 0 ? Math.min(newValue, maxItemsToShow) : newValue;
      });
    }
  };

  // Варианты анимаций
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
      y: animationType === 'slide' ? 20 : 0,
      scale: animationType === 'scale' ? 0.8 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        stiffness: 400,
        damping: 17
      }
    },
    tapped: { scale: 0.95 }
  };

  // Дефолтный рендер карточки
  const renderDefaultCard = (item: T, variants: any) => {
    const displayValue = searchConfig.getDisplayValue(item);
    const imageUrl = searchConfig.getImageUrl?.(item);
    const category = searchConfig.getCategory?.(item);
    const date = searchConfig.getDate?.(item);
    const readTime = searchConfig.getReadTime?.(item);
    const excerpt = searchConfig.getExcerpt?.(item);
    const author = searchConfig.getAuthor?.(item);

    return (
      <motion.article
        key={searchConfig.getDisplayValue(item)}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group flex flex-col"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        onClick={() => searchConfig.onItemClick?.(item)}
      >
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={displayValue}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {category && (
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {category}
              </div>
            )}
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-1">
          {(date || readTime) && (
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              {date && <span>{date}</span>}
              {readTime && <span>{readTime}</span>}
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {displayValue}
          </h3>
          
          {excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{excerpt}</p>
          )}
          
          {(author || searchConfig.onItemClick) && (
            <div className="flex items-center justify-between mt-auto">
              {author && <span className="text-sm text-gray-500">Автор: {author}</span>}
              {searchConfig.onItemClick && (
                <motion.button 
                  className="text-blue-600 font-semibold text-sm cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  Читать →
                </motion.button>
              )}
            </div>
          )}
        </div>
      </motion.article>
    );
  };

  // Простой рендер для списка
  const renderDefaultListItem = (item: T, variants: any) => (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
      onClick={() => searchConfig.onItemClick?.(item)}
    >
      <h3 className="font-semibold text-gray-800 mb-2">
        {searchConfig.getDisplayValue(item)}
      </h3>
      <div className="flex flex-wrap gap-1">
        {getItemTags(item).map(tag => (
          <span
            key={tag}
            className={`px-2 py-1 text-xs rounded-full ${
              finalAvailableTags.includes(tag)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );

  // Определяем классы для grid в зависимости от layout
  const gridClasses = {
    cards: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
    list: "space-y-4",
    custom: ""
  }[gridLayout];

  return (
    <div className={`w-full max-w-7xl mx-auto p-6 space-y-6 ${className}`}>
      {/* Универсальное поле поиска с интеллектуальными подсказками */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by name, content, or add tags with #..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setIsSuggestionsOpen(true)}
            onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchSuggestions.length > 0) {
                handleSuggestionSelect(searchSuggestions[0]);
              }
            }}
            className="w-full p-4 pl-12 rounded-lg border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent shadow-sm"
          />
          <motion.div 
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            animate={{ rotate: searchTerm ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🔍
          </motion.div>

          {/* Интеллектуальные подсказки */}
          <AnimatePresence>
            {isSuggestionsOpen && searchSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white border border-gray-200 
                           rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto"
              >
                {searchSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={`${suggestion.type}-${suggestion.value}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onMouseDown={() => handleSuggestionSelect(suggestion)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {suggestion.type === 'tag' ? (
                          <>
                            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">
                              #
                            </span>
                            <span className="text-blue-600 font-medium">{suggestion.display}</span>
                          </>
                        ) : (
                          <>
                            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
                              📝
                            </span>
                            <span className="text-gray-700">{suggestion.display}</span>
                          </>
                        )}
                      </div>
                      {suggestion.type === 'tag' && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          {suggestion.count} items
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Выбранные теги */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 items-center"
        >
          <AnimatePresence mode="popLayout">
            {selectedTags.map(tag => (
              <motion.div
                key={tag}
                variants={tagVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white 
                           rounded-full text-sm font-medium shadow-md"
              >
                <span>#{tag}</span>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveTag(tag)}
                  className="w-5 h-5 rounded-full bg-white bg-opacity-20 flex items-center 
                             justify-center text-xs hover:bg-opacity-30"
                >
                  ×
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Кнопка очистки всех тегов */}
          {selectedTags.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllTags}
              className="px-3 py-2 bg-red-500 text-white text-sm rounded-full 
                         hover:bg-red-600 transition-colors flex items-center gap-1"
            >
              <span>Clear All Tags</span>
              <span className="text-xs">({selectedTags.length})</span>
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Статистика и очистка */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center"
      >
        <div className="space-y-1">
          <span className="text-gray-600 text-sm block">
            Showing {displayData.length} of {filteredData.length} items
            {maxItemsToShow > 0 && filteredData.length > maxItemsToShow && 
              ` (limited to ${maxItemsToShow})`}
          </span>
          {selectedTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-blue-600"
            >
              Filtering by {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}
            </motion.div>
          )}
        </div>
        
        {(searchTerm || selectedTags.length > 0) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={clearFilters}
            className="text-blue-500 hover:text-blue-700 underline text-sm"
          >
            Clear all filters
          </motion.button>
        )}
      </motion.div>

      {/* Список результатов */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={gridClasses}
      >
        <AnimatePresence mode="popLayout">
          {displayData.map((item, index) => (
            searchConfig.renderItem 
              ? searchConfig.renderItem(item, itemVariants)
              : gridLayout === 'cards' 
                ? renderDefaultCard(item, itemVariants)
                : renderDefaultListItem(item, itemVariants)
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Пагинация или кнопка "Load More" */}
      {(enablePagination || canLoadMore) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center space-x-4 pt-6"
        >
          {enablePagination && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
              >
                Previous
              </motion.button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </motion.button>
            </>
          )}
          
          {!enablePagination && showLoadMoreButton && canLoadMore && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium"
            >
              Load More ({Math.min(itemsPerPage, filteredData.length - itemsToShow)} more)
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Состояние "нет результатов" */}
      <AnimatePresence>
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12 text-gray-500"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 2 },
                scale: { duration: 0.5 }
              }}
              className="text-4xl mb-4"
            >
              🔍
            </motion.div>
            <p className="text-lg">No items found</p>
            <p className="text-sm mt-2">Try adjusting your search criteria</p>
            {(searchTerm || selectedTags.length > 0) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Clear filters
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Хелпер для быстрого создания компонента
export function createSearchComponent<T>(
  defaultConfig: SearchConfig<T>
) {
  return (props: Omit<AnimatedSearchComponentProps<T>, 'searchConfig'>) => (
    <AnimatedSearchComponent {...props} searchConfig={defaultConfig} />
  );
}