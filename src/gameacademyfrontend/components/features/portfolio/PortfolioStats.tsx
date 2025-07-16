// src/components/features/portfolio/PortfolioStats.tsx
type PortfolioStatsProps = {
  totalProjects: number;
  hallOfFameCount: number;
  filteredCount: number;
  selectedCategory: string;
};

const PortfolioStats = ({ 
  totalProjects, 
  hallOfFameCount, 
  filteredCount,
  selectedCategory
}: PortfolioStatsProps) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">Статистика</h4>
    <ul className="space-y-1 text-sm text-gray-600">
      <li className="flex justify-between">
        <span>Всего проектов:</span>
        <span className="font-medium">{totalProjects}</span>
      </li>
      <li className="flex justify-between">
        <span>На стене славы:</span>
        <span className="font-medium">{hallOfFameCount}</span>
      </li>
      <li className="flex justify-between">
        <span>В категории "{selectedCategory === "all" ? "Все проекты" : selectedCategory}":</span>
        <span className="font-medium">{filteredCount}</span>
      </li>
    </ul>
  </div>
);

export default PortfolioStats;