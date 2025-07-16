'use client'; // Важно: указываем что это клиентский компонент

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isBrowser, setIsBrowser] = useState<boolean>(false); // Для безопасного доступа к window

  useEffect(() => {
    // Устанавливаем флаг что компонент выполняется в браузере
    setIsBrowser(true);
    
    // Проверяем доступность window перед использованием
    if (typeof window === "undefined") return;

    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Инициализируем видимость при монтировании
    toggleVisibility();
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    // Дополнительная проверка для Next.js
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Не рендерим компонент при SSR
  if (!isBrowser) return null;

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition"
      aria-label="Вернуться к началу"
    >
      <FaArrowUp className="text-base" />
      <span className="hidden sm:inline text-sm font-medium">
        Вернуться к началу
      </span>
    </button>
  ) : null;
};

export default BackToTopButton;