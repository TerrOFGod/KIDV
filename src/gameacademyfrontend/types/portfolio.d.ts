import { StaticImageData } from "next/image";

// Тип для навыка в фазе проекта
export interface ProjectSkill {
  name: string;
  level: number;
}

// Тип для фазы проекта
export interface ProjectPhase {
  title: string;
  date: string;
  description: string;
  skills?: ProjectSkill[];
}

// Тип для автора проекта
export interface ProjectAuthor {
  name: string;
  slug: string;
  role: string;
}

// Основной тип для элемента портфолио
export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  image: string | StaticImageData;
  description?: string;
  releaseDate?: string;
  download?: string;
  phases?: ProjectPhase[];
  goals?: string[];
  features?: string[];
  screenshots?: string[];
  hallOfFame?: boolean;
  authors?: ProjectAuthor[];
  year?: number;
  markdown?: string; 
}