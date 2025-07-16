// src/components/features/successStories/YearFilter.tsx
import React from "react";

type YearFilterProps = {
  years: number[];
  selectedYears: number[];
  onToggleYear: (year: number) => void;
  onReset: () => void;
};

const YearFilter = ({ 
  years, 
  selectedYears, 
  onToggleYear, 
  onReset 
}: YearFilterProps) => (
  <div>
    <div className="flex flex-wrap gap-2">
      {years.map((year) => {
        const isSelected = selectedYears.includes(year);
        return (
          <button
            key={year}
            onClick={() => onToggleYear(year)}
            className={`px-4 py-1 text-sm rounded-full border transition ${
              isSelected
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {year}
          </button>
        );
      })}
    </div>

    {selectedYears.length > 0 && (
      <button
        onClick={onReset}
        className="text-sm text-primary underline mt-2"
      >
        Сбросить фильтры
      </button>
    )}
  </div>
);

export default YearFilter;