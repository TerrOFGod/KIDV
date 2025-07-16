// src/components/features/portfolio/CategoryFilter.tsx
'use client';

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: CategoryFilterProps) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">Категории</h4>
    <ul className="space-y-2">
      {categories.map((category) => (
        <li
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`cursor-pointer p-2 rounded-lg transition-colors ${
            selectedCategory === category 
              ? "bg-blue-50 text-blue-700 font-semibold" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2">
              {selectedCategory === category ? "•" : "○"}
            </span>
            <span className="capitalize">
              {category === "all" ? "Все проекты" : category}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CategoryFilter;