// src/components/features/portfolio/ProjectAuthors.tsx
import Link from "next/link";
import { ProjectAuthor } from "@/types/portfolio";

type ProjectAuthorsProps = {
  authors: ProjectAuthor[];
};

const ProjectAuthors = ({ authors }: ProjectAuthorsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {authors.map((author, i) => (
      <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex-1">
          <Link
            href={`/staff/${author.slug}`}
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            {author.name}
          </Link>
          {author.role && (
            <p className="text-sm text-gray-600 mt-1">{author.role}</p>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ProjectAuthors;