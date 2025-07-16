'use client'; // Директива для клиентского компонента (требуется для Framer Motion)

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  noAnimation?: boolean; // Опциональный флаг отключения анимации
  className?: string; // Опциональный класс для дополнительного стиля
}

const SectionWrapper = ({ 
  children, 
  noAnimation = false, 
  className = "" 
}: SectionWrapperProps) => {
  // Базовый класс с дополнительными классами
  const baseClass = `space-y-10 ${className}`;

  // Вариант без анимации
  if (noAnimation) {
    return <section className={baseClass}>{children}</section>;
  }

  // Вариант с анимацией
  return (
    <motion.section
      className={baseClass}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} // Изменено на whileInView
      viewport={{ once: true, margin: "-20% 0px" }} // Триггер анимации при появлении в области видимости
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;