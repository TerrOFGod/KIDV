/* eslint-disable @typescript-eslint/no-unused-vars */
import { StaticImageData } from "next/image";

// Тип для редкости сотрудника
export type Level = "Junior" | "Middle" | "Senior";
export type PositionType = "Научно-педагогический работник" | "Профессорско-преподавательский состав";

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
  positions: Position[]; // Человекочитаемая должность
  educationLevel: string;
  researchPosition: string;
  photo?: string; // URL изображения или статичный ресурс

  // Описательные поля
  bio?: string;
  stats?: StaffStat[];
  skills?: StaffSkill[];
  achievements?: StaffAchievement[];

  tags?: string[];
  contact?: Contact[];
}