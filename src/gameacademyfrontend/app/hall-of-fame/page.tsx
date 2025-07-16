// src/app/hall-of-fame/page.tsx
'use client';

import { motion } from "framer-motion";

import portfolioData from "@/data/portfolio";
import { PortfolioItem } from "@/types/portfolio";

import HallOfFameHeader from "@/components/features/hallOfFame/HallOfFameHeader";
import ProjectGrid from "@/components/features/hallOfFame/ProjectGrid";
import CallToAction from "@/components/features/hallOfFame/CallToAction";

const HallOfFamePage = () => {
  // Отбираем только помеченные проекты
  const hallOfFameProjects = portfolioData.filter(
    (project: PortfolioItem) => project.hallOfFame
  );

  return (
    <motion.section
      className="py-12 px-4 max-w-7xl mx-auto space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <HallOfFameHeader />
      
      <ProjectGrid projects={hallOfFameProjects} />
      
      {hallOfFameProjects.length > 0 && <CallToAction />}
    </motion.section>
  );
};

export default HallOfFamePage;