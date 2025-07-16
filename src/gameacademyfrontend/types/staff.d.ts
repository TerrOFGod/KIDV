import { StaticImageData } from "next/image";

// Тип для редкости сотрудника
export type Rarity = "LEGENDARY" | "RARE" | "COMMON";

// Тип для статистики
export interface StaffStat {
  label: string;
  value: number;
}

// Тип для поднавыка
export interface Subskill {
  name: string;
  description?: string;
}

// Тип для навыка
export interface StaffSkill {
  name: string;
  level: number;
  description?: string;
  subskills?: Subskill[];
}

// Тип для достижения
export interface StaffAchievement {
  title: string;
  icon: string; // Название иконки (например, "FaUpload")
  description: string;
}

// Основной тип для сотрудника
export interface StaffMember {
  // Базовые поля
  slug: string;
  name: string;
  position: string; // Человекочитаемая должность
  photo: string | StaticImageData; // URL изображения или статичный ресурс
  
  // Роли и квалификация
  title?: string; // Ключ для словаря ролей (например, "head", "senior")
  rarity?: Rarity; // Уровень редкости для игрового стиля
  
  // Контактная информация
  email?: string;
  telegram?: string;
  github?: string;
  
  // Описательные поля
  bio?: string;
  researchInterests?: string[];
  
  // Игровые атрибуты
  stats?: StaffStat[];
  skills?: StaffSkill[];
  achievements?: StaffAchievement[];
  
  // Устаревшие/альтернативные поля (для совместимости)
  id?: string | number; // Для обратной совместимости
  image?: string; // Альтернатива для photo
}