'use client'; // Директива для клиентского компонента

import { MouseEvent } from "react";

// Тип для объекта skill
interface Skill {
  name: string;
  level: number;
  description?: string; // Опциональное поле
}

// Типизация пропсов компонента
interface SkillDetailModalProps {
  skill: Skill;
  onClose: () => void;
}

const SkillDetailModal = ({ skill, onClose }: SkillDetailModalProps) => {
  // Обработчик клика по оверлею
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Закрыть модальное окно"
        >
          ✕
        </button>
        <h2 id="skill-modal-title" className="text-2xl font-bold mb-2">
          {skill.name}
        </h2>
        <p className="text-sm text-gray-600 mb-4">Уровень: {skill.level}</p>
        <p className="text-gray-700">
          {skill.description || "Описание навыка пока не добавлено."}
        </p>
      </div>
    </div>
  );
};

export default SkillDetailModal;