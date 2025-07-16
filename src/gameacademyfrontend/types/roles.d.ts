// src/types/roles.d.ts

export interface RoleItem {
  label: string;
  description?: string; // Опциональное поле для будущего расширения
}

export interface RolesDict {
  [key: string]: RoleItem;
}