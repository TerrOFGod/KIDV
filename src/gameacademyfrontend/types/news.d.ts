/* eslint-disable @typescript-eslint/no-unused-vars */
import { StaticImageData } from "next/image";

// Определение типа для элемента новостей
export interface NewsItem {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  image?: string; // Для локальных и внешних изображений
  date: string;
  markdown?: string;
  excerpt?: string;
  content?: string;
  readTime?: string;
  author?: { name: string; slug: string }; // Опциональный идентификатор автора
  tags?: string[];
}