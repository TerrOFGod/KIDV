/**
 * Безопасно получает путь к изображению с fallback
 */
export const getSafeImagePath = (imagePath: string | undefined): string => {
  if (!imagePath) {
    return '/images/placeholder.jpg'; // Создайте placeholder изображение
  }
  
  // Если путь уже абсолютный (начинается с /), возвращаем как есть
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Если путь относительный, преобразуем в абсолютный
  if (imagePath.startsWith('../')) {
    return imagePath.replace('../', '/');
  }
  
  // Добавляем / если его нет
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

/**
 * Проверяет существование изображения
 */
export const checkImageExists = async (src: string): Promise<boolean> => {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};