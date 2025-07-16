'use client';

import { useState } from "react";
import newsData from "@/data/news";

import PageTitle from "@/components/ui/PageTitle";

import AnimatedDiv  from '@/components/layout/AnimatedDiv';

import NewsGrid from "@/components/features/news/NewsGrid";
import NewsFilterPanel from "@/components/features/news/NewsFilterPanel";

const NewsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredNews = newsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesQuery = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const uniqueCategories = Array.from(
    new Set(newsData.map((item) => item.category))
  );

  const categories = ["all", ...uniqueCategories];

  return (
    <AnimatedDiv>
      <section className="space-y-10 bg-light">
        <PageTitle>НОВОСТИ</PageTitle>

        <div className="flex flex-col-reverse lg:flex-row gap-y-8 lg:gap-y-0 lg:gap-x-12">
          {/* Левая колонка: Список новостей */}
          <NewsGrid items={filteredNews} />

          {/* Правая колонка: Поиск и фильтр */}
          <NewsFilterPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>
      </section>
    </AnimatedDiv>
  );
};

export default NewsList;