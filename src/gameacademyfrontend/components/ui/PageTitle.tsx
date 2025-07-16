'use client'; // Директива для клиентского компонента (требуется для Framer Motion)

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTitleProps {
  children: ReactNode; // Типизация для содержимого заголовка
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <motion.h1
      className="text-4xl md:text-5xl italic font-semibold text-gray-800 mb-6 uppercase tracking-wider"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      role="heading" // Улучшение семантики
      aria-level={1} // Указание уровня заголовка
    >
      {children}
    </motion.h1>
  );
};

export default PageTitle;