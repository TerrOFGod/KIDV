// src/components/features/news/NewsCard.tsx
import Link from "next/link";
import Image from "next/image";

import { NewsItem } from "@/types/news";

type NewsCardProps = {
  item: NewsItem;
};

const NewsCard = ({ item }: NewsCardProps) => (
  <Link
    href={`/news/${item.slug}`}
    className="group block rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,120,255,0.3)] transform hover:scale-[1.02] transition duration-300"
  >
    <div className="relative h-56">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover group-hover:opacity-80 transition duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="bg-white px-4 py-3">
      <span className="text-sm text-gray-500 uppercase tracking-wide">
        {item.category}
      </span>
      <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition duration-300">
        {item.title}
      </h3>
    </div>
  </Link>
);

export default NewsCard;