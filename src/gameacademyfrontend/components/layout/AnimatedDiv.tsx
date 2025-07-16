'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type AnimatedDivProps = {
  children: ReactNode;
  className?: string;
  animation?: Variants;
  initial?: string | boolean;
  animate?: string | boolean;
  transition?: {
    duration?: number;
    delay?: number;
  };
};

export default function AnimatedDiv({
  children,
  className = '',
  animation,
  initial = "hidden",
  animate = "visible",
  transition = { duration: 0.5 }
}: AnimatedDivProps) {
  // Дефолтная анимация если не передана кастомная
  const defaultAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: transition?.duration,
        delay: transition?.delay,
      }
    }
  };

  return (
    <motion.div
      className={`${className}`}
      variants={animation || defaultAnimation}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}