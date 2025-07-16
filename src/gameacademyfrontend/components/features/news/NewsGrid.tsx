// src/components/features/news/NewsGrid.tsx
import { NewsItem } from "@/types/news";

import NewsCard from "@/components/features/news/NewsCard";

type NewsGridProps = {
  items: NewsItem[];
};

const NewsGrid = ({ items }: NewsGridProps) => (
  <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
    {items.map((item) => (
      <NewsCard key={item.slug} item={item} />
    ))}
  </div>
);

export default NewsGrid;