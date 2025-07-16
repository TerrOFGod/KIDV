// src/components/features/portfolio/ProjectsGrid.tsx
import { PortfolioItem } from "@/types/portfolio";
import ProjectCard from "@/components/features/portfolio/ProjectCard";

type ProjectsGridProps = {
  projects: PortfolioItem[];
};

const ProjectsGrid = ({ projects }: ProjectsGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.map((project) => (
      <ProjectCard key={project.slug} project={project} />
    ))}
  </div>
);

export default ProjectsGrid;