// src/components/features/portfolio/ProjectCover.tsx
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio";
import { getImageUrl } from "@/utils/imageUtils";

type ProjectCoverProps = {
  project: PortfolioItem;
};

const ProjectCover = ({ project }: ProjectCoverProps) => (
  <div className="w-full relative -mt-16 md:-mt-24">
    {project.image ? (
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
        <Image
          src={getImageUrl(project.image)}
          alt={`Обложка проекта: ${project.title}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    ) : (
      <div className="bg-gray-200 border-2 border-dashed w-full h-96 flex items-center justify-center">
        <span className="text-gray-500 text-lg">Изображение отсутствует</span>
      </div>
    )}
  </div>
);

export default ProjectCover;