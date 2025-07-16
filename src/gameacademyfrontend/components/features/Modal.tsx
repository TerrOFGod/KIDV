'use client'; // Директива для клиентского компонента

import { ReactNode, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  children: ReactNode; // Типизация для содержимого модального окна
  onClose: () => void; // Функция закрытия без аргументов
  isOpen?: boolean; // Опциональный флаг открытия (для контроля извне)
}

const Modal = ({ children, onClose, isOpen = true }: ModalProps) => {
  // Обработчик клика на оверлей
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 relative z-60 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
              onClick={onClose}
              aria-label="Закрыть"
            >
              &times;
            </button>
            <div className="mt-2">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;