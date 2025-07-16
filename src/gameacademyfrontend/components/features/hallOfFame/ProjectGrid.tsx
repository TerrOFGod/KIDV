// src/components/features/hallOfFame/ProjectGrid.tsx
import { motion } from "framer-motion";
import { PortfolioItem } from "@/types/portfolio";

import ProjectCard from "@/components/features/hallOfFame/ProjectCard";
import EmptyHallOfFame from "@/components/features/hallOfFame/EmptyHallOfFame";

type ProjectGridProps = {
  projects: PortfolioItem[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  if (projects.length === 0) {
    return <EmptyHallOfFame />;
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.slug || i} project={project} index={i} />
      ))}
    </motion.div>
  );
};

export default ProjectGrid;