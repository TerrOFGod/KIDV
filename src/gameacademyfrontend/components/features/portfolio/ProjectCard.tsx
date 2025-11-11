import Link from 'next/link';
import { PortfolioItem } from '@/types/portfolio';
import SafeImage from '@/components/ui/SafeImage';

interface ProjectCardProps {
  project: PortfolioItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-1 block"
    >
      <div className="relative h-48 bg-gray-200">
        <SafeImage
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          fallbackSrc="/images/portfolio/placeholder.jpg"
        />
        {project.hallOfFame && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
              ★ Hall of Fame
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {project.category}
          </span>
          <span className="text-xs text-gray-500">
            {project.year}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {project.tags?.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
            {project.tags!.length > 2 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                +{project.tags!.length - 2}
              </span>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            {project.authors!.length} author{project.authors!.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </Link>
  );
}