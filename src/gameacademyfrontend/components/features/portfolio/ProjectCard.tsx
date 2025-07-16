// src/components/features/portfolio/ProjectCard.tsx
import Link from "next/link";
import Image from "next/image";

import { PortfolioItem } from "@/types/portfolio";

import { getImageUrl } from "@/utils/imageUtils";

type ProjectCardProps = {
  project: PortfolioItem;
};

const ProjectCard = ({ project }: ProjectCardProps) => (
  <Link
    href={`/portfolio/${project.slug}`}
    className="group block rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,120,255,0.3)] transform hover:scale-[1.02] transition duration-300 bg-white"
    aria-label={`Посмотреть проект: ${project.title}`}
  >
    <div className="relative h-56">
      {project.image ? (
        <Image
          src={getImageUrl(project.image)}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:opacity-80 transition-opacity duration-300"
        />
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
          <span className="text-gray-500">Изображение отсутствует</span>
        </div>
      )}
    </div>
    <div className="px-4 py-4">
      <div className="flex justify-between items-start">
        <span className="text-sm text-gray-500 uppercase tracking-wide">
          {project.category}
        </span>
        {project.year && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {project.year}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold leading-snug text-dark group-hover:text-primary transition-colors duration-300 mt-2">
        {project.title}
      </h3>
      
      {/* Краткое описание */}
      {project.description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {project.description}
        </p>
      )}
    </div>
  </Link>
);

export default ProjectCard;