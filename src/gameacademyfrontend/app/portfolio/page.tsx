'use client'; // Директива для клиентского компонента

import { useState } from "react";

import { PortfolioItem } from "@/types/portfolio"; // Импорт типа
import portfolioData from "@/data/portfolio";

import PageTitle from "@/components/ui/PageTitle";

import ProjectsGrid from "@/components/features/portfolio/ProjectsGrid";
import SearchFilter from "@/components/features/portfolio/SearchFilter";
import CategoryFilter from "@/components/features/portfolio/CategoryFilter";
import PortfolioStats from "@/components/features/portfolio/PortfolioStats";
import EmptyProjects from "@/components/features/portfolio/EmptyProjects";

import AnimatedDiv from "@/components/layout/AnimatedDiv";

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Фильтрация проектов
  const filteredProjects = portfolioData.filter((project: PortfolioItem) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesQuery = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Получение уникальных категорий
  const uniqueCategories = Array.from(
    new Set(portfolioData.map((project: PortfolioItem) => project.category))
  );

  const categories = ["all", ...uniqueCategories];

  // Статистика
  const totalProjects = portfolioData.length;
  const hallOfFameCount = portfolioData.filter(p => p.hallOfFame).length;

  // Сброс фильтров
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <AnimatedDiv className="bg-light min-h-screen">
      <section className="container mx-auto py-10 px-4 space-y-10">
        <PageTitle>Портфолио</PageTitle>

        <div className="flex flex-col-reverse lg:flex-row gap-y-8 lg:gap-y-0 lg:gap-x-12">
          {/* Основная область с проектами */}
          <div className="w-full lg:w-2/3">
            {filteredProjects.length > 0 ? (
              <ProjectsGrid projects={filteredProjects} />
            ) : (
              <EmptyProjects onResetFilters={handleResetFilters} />
            )}
          </div>

          {/* Панель фильтров */}
          <aside className="w-full lg:w-1/3 space-y-8">
            {/* Поиск */}
            <SearchFilter 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />

            {/* Категории */}
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />

            {/* Дополнительные фильтры (можно добавить позже) */}
            <PortfolioStats 
              totalProjects={totalProjects}
              hallOfFameCount={hallOfFameCount}
              filteredCount={filteredProjects.length}
              selectedCategory={selectedCategory}
            />
          </aside>
        </div>
      </section>
    </AnimatedDiv>
  );
};

export default Portfolio;