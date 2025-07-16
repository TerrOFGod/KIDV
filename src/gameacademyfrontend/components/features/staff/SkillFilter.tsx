// src/components/features/staff/SkillFilter.tsx
'use client';

import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

type SkillFilterProps = {
  skills: string[];
  selectedSkills: string[];
  setSelectedSkills: Dispatch<SetStateAction<string[]>>;
};

const SkillFilter = ({ 
  skills, 
  selectedSkills, 
  setSelectedSkills 
}: SkillFilterProps) => {
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const resetFilters = () => setSelectedSkills([]);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill) => {
          const isSelected = selectedSkills.includes(skill);
          return (
            <motion.button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-1.5 text-sm rounded-full border-2 font-medium transition-colors ${
                isSelected
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill}
            </motion.button>
          );
        })}
      </div>

      {selectedSkills.length > 0 && (
        <button
          onClick={resetFilters}
          className="text-sm text-primary font-medium hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Сбросить фильтры
        </button>
      )}
    </div>
  );
};

export default SkillFilter;