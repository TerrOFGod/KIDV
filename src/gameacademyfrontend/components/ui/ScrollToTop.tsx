'use client'; // Директива для клиентского компонента

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Проверка доступности window (для SSR)
    if (typeof window !== "undefined") {
      // Прокручиваем в начало страницы при изменении пути
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Добавлено плавное скроллирование
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;