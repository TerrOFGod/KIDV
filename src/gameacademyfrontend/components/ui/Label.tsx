import React from 'react';

// Определение типа для элемента словаря
interface DictItem {
  label?: string;  // Опциональное поле label
}

// Определение типов для пропсов компонента
interface LabelProps {
  dict: Record<string, DictItem | undefined>;  // Словарь с ключами-строками
  value: string | number;  // Значение может быть строкой или числом
}

const Label: React.FC<LabelProps> = ({ dict, value }) => {
  // Преобразуем значение в строку для использования в качестве ключа
  const key = value.toString();
  
  // Получаем элемент из словаря
  const item = dict[key];
  
  // Возвращаем label из словаря или исходное значение
  return <>{item?.label || value}</>;
};

export default Label;