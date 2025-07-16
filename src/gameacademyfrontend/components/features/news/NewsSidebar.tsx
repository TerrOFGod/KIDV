// src/components/features/news/NewsSidebar.tsx
import { NewsItem } from "@/types/news";
import categoryData from "@/data/categories";

type NewsSidebarProps = {
  article: NewsItem;
};

const NewsSidebar = ({ article }: NewsSidebarProps) => (
  <aside className="lg:col-span-1 space-y-6 mt-6 pt-6 border-t border-gray-300">
    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
      Дополнительная информация
    </h4>

    <div>
      <p className="text-xs font-medium text-gray-500 uppercase mb-1 tracking-wide">
        Дата выхода
      </p>
      <p className="text-sm text-gray-800">
        {new Date(article.date).toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>

    <div>
      <p className="text-xs font-medium text-gray-500 uppercase mb-1 tracking-wide">
        Категории новостей
      </p>
      <p className="text-sm text-gray-800">
        {categoryData[article.category as keyof typeof categoryData]?.label ||
          article.category}
      </p>
    </div>
  </aside>
);

export default NewsSidebar;