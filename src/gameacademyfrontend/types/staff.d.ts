/* eslint-disable @typescript-eslint/no-unused-vars */
import { StaticImageData } from "next/image";

// Тип для редкости сотрудника
export type Level = "Junior" | "Middle" | "Senior";
export type PositionType = "Университетская" | "Структурная";

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
  level: Level;
  description?: string;
  subskills?: Subskill[];
}

// Тип для достижения
export interface StaffAchievement {
  title: string;
  icon: string; // Название иконки (например, "FaUpload")
  description: string;
}

// Тип для контактов
export interface Contact {
  title: string;
  value: string;
}

export interface Position {
  type: PositionType;
  value: string;
}

// Основной тип для сотрудника
export interface StaffMember {
  _id?: string;
  name: string;
  position: Position; // Человекочитаемая должность
  photo?: string; // URL изображения или статичный ресурс
  
  // Роли и квалификация
  title?: string; // Ключ для словаря ролей (например, "head", "senior")
  
  // Описательные поля
  bio?: string;
  
  // Игровые атрибуты
  stats?: StaffStat[];
  skills?: StaffSkill[];
  achievements?: StaffAchievement[];
  
  // Устаревшие/альтернативные поля (для совместимости)
  image?: string; // Альтернатива для photo
  tags?: string[];
  contact?: Contact[];
}