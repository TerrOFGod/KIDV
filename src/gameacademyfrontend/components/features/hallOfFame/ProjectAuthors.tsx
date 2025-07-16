// src/components/features/hallOfFame/ProjectAuthors.tsx
import { ProjectAuthor } from "@/types/portfolio";

type ProjectAuthorsProps = {
  authors: ProjectAuthor[];
};

const ProjectAuthors = ({ authors }: ProjectAuthorsProps) => {
  if (!authors || authors.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {authors.slice(0, 3).map((member, idx) => (
        <span 
          key={idx} 
          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
        >
          {member.name}
        </span>
      ))}
      {authors.length > 3 && (
        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
          +{authors.length - 3} участников
        </span>
      )}
    </div>
  );
};

export default ProjectAuthors;