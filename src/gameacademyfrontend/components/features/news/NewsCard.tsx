import Link from 'next/link';
import { NewsItem } from '@/types/news';
import SafeImage from '@/components/ui/SafeImage';

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-1 block"
    >
      <div className="relative h-48 bg-gray-200">
        <SafeImage
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          fallbackSrc="/images/news/placeholder.jpg"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">
            {new Date(item.date).toLocaleDateString()}
          </span>
          <span className="text-sm text-gray-500">
            By {item.author?.name}
          </span>
        </div>
        
        <h3 className="font-semibold text-xl mb-3 text-gray-900 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {item.markdown.substring(0, 120)}...
        </p>
        
        <div className="flex flex-wrap gap-1">
          {item.tags?.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}