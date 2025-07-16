'use client'; // Директива для клиентского компонента

import { usePathname } from "next/navigation"; // Замена useLocation из react-router
import Header from "./Header";
import { ReactNode } from "react"; // Импорт типа для children

interface LayoutProps {
  children: ReactNode; // Четкая типизация для children
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname(); // Получаем текущий путь в Next.js
  const isNewsDetail = pathname?.startsWith("/news/") || false;

  return (
    <div className="bg-light min-h-screen font-montserrat">
      <Header />
      <main
        className={`max-w-7xl mx-auto p-4 ${
          isNewsDetail ? "pt-0" : "pt-16 md:pt-24"
        } space-y-12`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;