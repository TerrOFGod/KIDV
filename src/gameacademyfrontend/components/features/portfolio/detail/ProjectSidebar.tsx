// src/components/features/portfolio/ProjectSidebar.tsx
import Link from "next/link";
import { PortfolioItem } from "@/types/portfolio";

type ProjectSidebarProps = {
  project: PortfolioItem;
};

const ProjectSidebar = ({ project }: ProjectSidebarProps) => (
  <aside className="space-y-6 border-t pt-6 border-gray-300">
    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
      Дополнительная информация
    </h4>
    
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-xs text-gray-500 uppercase mb-1">Дата релиза</p>
      <p className="text-sm font-medium">{project.releaseDate || "Не указана"}</p>
    </div>
    
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-xs text-gray-500 uppercase mb-1">Категория</p>
      <p className="text-sm font-medium">{project.category}</p>
    </div>
    
    {project.year && (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-xs text-gray-500 uppercase mb-1">Год реализации</p>
        <p className="text-sm font-medium">{project.year}</p>
      </div>
    )}
    
    {project.download && (
      <a
        href={project.download}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
      >
        Скачать проект
      </a>
    )}
  </aside>
);

export default ProjectSidebar;