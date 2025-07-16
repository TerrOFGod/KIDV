import { StaticImageData } from "next/image";

// Определение типа для элемента новостей
export interface NewsItem {
  slug: string;
  title: string;
  category: string;
  image: string | StaticImageData; // Для локальных и внешних изображений
  date: string;
  markdown: string;
  authorId?: string; // Опциональный идентификатор автора
}