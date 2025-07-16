// src/components/features/portfolio/ProjectContent.tsx
import ReactMarkdown from "react-markdown";
import { PortfolioItem } from "@/types/portfolio";

type ProjectContentProps = {
  project: PortfolioItem;
  content: string;
};

const ProjectContent = ({ project, content }: ProjectContentProps) => (
  <div className="space-y-10">
    <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>

    <div className="prose prose-lg prose-brand max-w-none text-gray-700">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>

    {project.goals && project.goals.length > 0 && (
      <div>
        <h2 className="text-3xl font-bold mb-4">Цели проекта</h2>
        <ul className="list-disc text-lg pl-5 mt-2 space-y-3 text-gray-700 marker:text-primary">
          {project.goals.map((goal, i) => (
            <li key={i} className="pl-2">{goal}</li>
          ))}
        </ul>
      </div>
    )}

    {project.features && project.features.length > 0 && (
      <div>
        <h2 className="text-3xl font-bold mb-4">Технические особенности</h2>
        <ul className="list-disc text-lg pl-5 mt-2 space-y-3 text-gray-700 marker:text-primary">
          {project.features.map((feature, i) => (
            <li key={i} className="pl-2">{feature}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default ProjectContent;