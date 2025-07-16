// src/components/features/news/MarkdownContent.tsx
import ReactMarkdown from "react-markdown";

type MarkdownContentProps = {
  content: string;
};

const MarkdownContent = ({ content }: MarkdownContentProps) => (
  <div className="prose prose-lg prose-brand max-w-none lg:col-span-3 marker:text-primary">
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);

export default MarkdownContent;