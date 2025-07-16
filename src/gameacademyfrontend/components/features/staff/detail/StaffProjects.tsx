// src/components/features/staff/StaffProjects.tsx
import Link from "next/link";
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio";

type StaffProjectsProps = {
  projects: PortfolioItem[];
};

const StaffProjects = ({ projects }: StaffProjectsProps) => {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-4 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold">Проекты преподавателя</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <Link
            key={i}
            href={`/portfolio/${project.slug}`}
            className="group block rounded overflow-hidden shadow hover:shadow-lg transition-all"
          >
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="bg-white p-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600">{project.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StaffProjects;