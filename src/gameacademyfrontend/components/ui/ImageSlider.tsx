'use client'; // Директива для клиентского компонента

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Типизация пропсов компонента
interface ImageSliderProps {
  images: string[]; // Массив строк с URL изображений
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState<number>(0);

  const prev = (): void => {
    setCurrent((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const next = (): void => {
    setCurrent((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Проверка на пустой массив изображений
  if (!images || images.length === 0) {
    return <div className="text-center py-12 text-gray-500">Нет изображений для отображения</div>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded shadow">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[current]}
            src={images[current]}
            alt={`Изображение ${current + 1}`}
            className="w-full object-cover"
            initial={{ opacity: 0.2, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
      </div>

      {/* Навигация */}
      <div className="flex items-center justify-between mt-4">
        <button 
          onClick={prev}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Предыдущее изображение"
        >
          <FaChevronLeft size={20} />
        </button>
        
        <span className="text-sm text-gray-700">
          {current + 1} из {images.length}
        </span>
        
        <button 
          onClick={next}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Следующее изображение"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;