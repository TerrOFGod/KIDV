'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string | undefined;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  style,
  priority = false,
  fallbackSrc = '/images/placeholder.jpg'
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(getValidImagePath(src, fallbackSrc));
  const [hasError, setHasError] = useState(false);

  // Функция для получения корректного пути к изображению
  function getValidImagePath(src: string | undefined, fallback: string): string {
    if (!src) return fallback;
    
    // Если это локальный файловый путь, используем fallback
    if (src.startsWith('D:/') || src.startsWith('C:/') || src.includes('\\')) {
      console.warn('Invalid image path detected:', src);
      return fallback;
    }
    
    // Если путь уже абсолютный (начинается с /), возвращаем как есть
    if (src.startsWith('/')) {
      return src;
    }
    
    // Если путь относительный, добавляем ведущий слеш
    return `/${src}`;
  }

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  // Для локальной разработки используем обычный img, чтобы избежать ошибок оптимизации
  if (process.env.NODE_ENV === 'development' && hasError) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        style={style}
        priority={priority}
        onError={handleError}
        unoptimized={process.env.NODE_ENV === 'development'}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      onError={handleError}
      unoptimized={process.env.NODE_ENV === 'development'}
    />
  );
}