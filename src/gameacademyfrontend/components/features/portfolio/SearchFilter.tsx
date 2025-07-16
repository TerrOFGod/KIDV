// src/components/features/portfolio/SearchFilter.tsx
'use client';

type SearchFilterProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const SearchFilter = ({ searchQuery, setSearchQuery }: SearchFilterProps) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">Поиск</h4>
    <input
      type="text"
      placeholder="Поиск проекта..."
      className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      aria-label="Поиск проектов"
    />
  </div>
);

export default SearchFilter;