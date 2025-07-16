import { PortfolioItem, ProjectPhase, ProjectAuthor } from "@/types/portfolio";
import portfolioData from "@/data/portfolio";
import { getMarkdownContent } from "@/utils/markdownUtils";
import PortfolioDetailClient from "@/components/features/portfolio/detail/PortfolioDetail";
import EmptyPortfolio from "@/components/features/portfolio/detail/EmptyPortfolio";

// Генерация статических путей
export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: project.slug,
  }));
}

// Серверный компонент для загрузки данных
export default async function PortfolioDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = portfolioData.find((p: PortfolioItem) => p.slug === slug);
  
  let content = "";
  if (project?.markdown) {
    try {
      content = await getMarkdownContent(project.markdown);
    } catch (error) {
      content = "### Контент проекта недоступен";
      console.error("Ошибка загрузки контента:", error);
    }
  }

  if (!project) {
    return (
      <EmptyPortfolio slug={slug}/>
    );
  }

  return (
    <PortfolioDetailClient 
      project={project} 
      content={content} 
    />
  );
}