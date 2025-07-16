// src/components/features/portfolio/EmptyProjects.tsx
'use client';

type EmptyProjectsProps = {
  onResetFilters: () => void;
};

const EmptyProjects = ({ onResetFilters }: EmptyProjectsProps) => (
  <div className="text-center py-12 bg-white rounded-xl shadow">
    <p className="text-gray-500 text-lg mb-4">Проекты по вашему запросу не найдены</p>
    <button 
      onClick={onResetFilters}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Сбросить фильтры
    </button>
  </div>
);

export default EmptyProjects;