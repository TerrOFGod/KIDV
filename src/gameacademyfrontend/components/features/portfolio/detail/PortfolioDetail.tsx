'use client';

import { useState } from "react";
import { motion } from "framer-motion";

import { PortfolioItem, ProjectPhase } from "@/types/portfolio";

import ProjectTimeline from "@/components/layout/ProjectTimeline";

import ImageSlider from "@/components/ui/ImageSlider";
import BackButton from "@/components/ui/BackButton";

import ProjectCover from "@/components/features/portfolio/detail/ProjectCover";
import ProjectContent from "@/components/features/portfolio/detail/ProjectContent";
import ProjectSidebar from "@/components/features/portfolio/detail/ProjectSidebar";
import ProjectAuthors from "@/components/features/portfolio/detail/ProjectAuthors";
import PhaseModal from "@/components/features/portfolio/detail/PhaseModal";

type PortfolioDetailClientProps = {
  project: PortfolioItem;
  content: string;
};

const PortfolioDetailClient = ({ project, content }: PortfolioDetailClientProps) => {
  const [modalData, setModalData] = useState<ProjectPhase | null>(null);

  const handlePhaseClick = (phase: ProjectPhase) => {
    setModalData(phase);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <motion.section
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProjectCover project={project} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <ProjectContent project={project} content={content} />
          </div>
          
          <div className="lg:col-span-1">
            <ProjectSidebar project={project} />
          </div>
        </div>

        {/* Этапы разработки */}
        {project.phases && project.phases.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Этапы разработки</h2>
            <ProjectTimeline events={project.phases} onClick={handlePhaseClick} />
          </div>
        )}

        {/* Скриншоты */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Скриншоты</h2>
            <ImageSlider images={project.screenshots} />
          </div>
        )}

        {/* Авторы проекта */}
        {project.authors && project.authors.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Авторы проекта</h2>
            <ProjectAuthors authors={project.authors} />
          </div>
        )}
      </div>

      <PhaseModal phase={modalData} onClose={closeModal} />

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <BackButton href="/portfolio">
          Вернуться к портфолио
        </BackButton>
      </div>
    </motion.section>
  );
};

export default PortfolioDetailClient;