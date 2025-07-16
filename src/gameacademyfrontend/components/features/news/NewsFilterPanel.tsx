// src/components/features/news/NewsFilterPanel.tsx
'use client';

import { Dispatch, SetStateAction } from "react";

import categoryData from "@/data/categories";

type NewsFilterPanelProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  categories: string[];
};

const NewsFilterPanel = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}: NewsFilterPanelProps) => (
  <aside className="w-full lg:w-1/3 space-y-8">
    <div>
      <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">
        Поиск
      </h4>
      <input
        type="text"
        placeholder="Поиск по заголовку…"
        className="w-full px-4 py-2 border rounded text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div>
      <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">
        Категории
      </h4>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer ${
              selectedCategory === category
                ? "font-semibold"
                : "text-gray-600"
            }`}
          >
            {categoryData[category as keyof typeof categoryData]?.label || category}
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

export default NewsFilterPanel;