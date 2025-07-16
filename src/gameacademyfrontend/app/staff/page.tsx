// src/app/staff/page.tsx
'use client';

import { useState } from "react";

import staffList from "@/data/staff";

import PageTitle from "@/components/ui/PageTitle";

import AnimatedSection from "@/components/layout/AnimatedSection";

import SkillFilter from "@/components/features/staff/SkillFilter";
import StaffGrid from "@/components/features/staff/StaffGrid";
import EmptyStaff from "@/components/features/staff/EmptyStaff";


const StaffPage = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Получение всех уникальных навыков
  const allSkills = Array.from(
    new Set(
      staffList.flatMap((staff) => 
        staff.stats ? staff.stats.map((stat) => stat.label) : []
      )
    )
  ).sort();

  // Фильтрация сотрудников по выбранным навыкам
  const filteredStaff = selectedSkills.length === 0
    ? staffList
    : staffList.filter((staff) => {
        // Проверяем, что у сотрудника есть stats
        if (!staff.stats) return false;
        
        // Проверяем, что все выбранные навыки есть у сотрудника
        return selectedSkills.every((selected) =>
          staff.stats!.some((stat) => stat.label === selected)
        );
      });

  // Сброс фильтров
  const resetFilters = () => setSelectedSkills([]);

  return (
    <AnimatedSection className="container mx-auto px-4 py-10 space-y-10">
      <PageTitle>НАШИ СОТРУДНИКИ</PageTitle>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <SkillFilter 
          skills={allSkills} 
          selectedSkills={selectedSkills} 
          setSelectedSkills={setSelectedSkills} 
        />
        
        {filteredStaff.length > 0 ? (
          <StaffGrid staffList={filteredStaff} />
        ) : (
          <EmptyStaff onReset={resetFilters} />
        )}
      </div>
    </AnimatedSection>
  );
};

export default StaffPage;