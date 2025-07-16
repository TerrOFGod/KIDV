// src/components/features/hallOfFame/ProjectCard.tsx
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { PortfolioItem } from "@/types/portfolio";

import ProjectAuthors from "@/components/features/hallOfFame/ProjectAuthors";

type ProjectCardProps = {
  project: PortfolioItem;
  index: number;
};

const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block rounded-xl overflow-hidden border-2 border-blue-300 relative bg-white
                transform transition duration-500 shadow-xl hover:shadow-[0_0_20px_4px_rgba(0,200,255,0.3)]"
      aria-label={`Посмотреть проект: ${project.title}`}
    >
      {/* Обложка проекта */}
      <div className="relative h-52">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:opacity-85 transition-opacity duration-300"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Изображение отсутствует</span>
          </div>
        )}
        
        {/* Бейдж */}
        <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold shadow z-10">
          💎 Выбор кафедры
        </span>
      </div>
      
      {/* Информация о проекте */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-start">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {project.category}
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {project.year}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-dark group-hover:text-primary transition-colors duration-300 mt-2">
          {project.title}
        </h3>
        
        {/* Участники проекта */}
        <ProjectAuthors authors={project.authors || []} />
      </div>
    </Link>
  </motion.div>
);

export default ProjectCard;