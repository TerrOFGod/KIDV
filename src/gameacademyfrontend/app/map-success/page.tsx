// src/app/success-map/page.tsx
'use client';

import { useState } from "react";

import successStories from "@/data/successStories";

import PageTitle from "@/components/ui/PageTitle";

import YearFilter from "@/components/features/successStories/YearFilter";
import SuccessMapView from "@/components/features/successStories/SuccessMapView";

const SuccessMapPage = () => {
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

  // Получаем уникальные годы и сортируем по убыванию
  const allYears = Array.from(
    new Set(successStories.map((s) => s.year))
  ).sort((a, b) => b - a);

  const toggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) 
        ? prev.filter((y) => y !== year) 
        : [...prev, year]
    );
  };

  const filteredStories =
    selectedYears.length === 0
      ? successStories
      : successStories.filter((s) => selectedYears.includes(s.year));

  return (
    <section className="space-y-10 px-4 max-w-7xl mx-auto">
      <PageTitle>Карта успеха выпускников</PageTitle>
      <p className="text-gray-600 max-w-2xl">
        Здесь отмечены коммерческие релизы, в которых участвовали наши выпускники.
      </p>

      <YearFilter
        years={allYears}
        selectedYears={selectedYears}
        onToggleYear={toggleYear}
        onReset={() => setSelectedYears([])}
      />

      <SuccessMapView stories={filteredStories} />
    </section>
  );
};

export default SuccessMapPage;