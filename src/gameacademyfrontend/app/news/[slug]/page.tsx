import { notFound } from 'next/navigation';

import { NewsItem } from "@/types/news";

import { getMarkdownContent } from '@/utils/markdownUtils';

import AnimatedDiv  from '@/components/layout/AnimatedDiv';

import FullWidthImage from '@/components/features/news/FullWidthImage';
import MarkdownContent from '@/components/features/news/MarkdownContent';
import NewsSidebar from '@/components/features/news/NewsSidebar';

// Генерация статических путей
export async function generateStaticParams() {
  const newsData = (await import('@/data/news')).default
  return newsData.map((article) => ({
    slug: article.slug,
  }))
}

// Получение данных статьи
async function getNewsItem(slug: string): Promise<{
  article: NewsItem;
  content: string;
}> {
  const newsData = (await import('@/data/news')).default
  const article = newsData.find((item) => item.slug === slug)

  if (!article) notFound()

  try{
    const content = await getMarkdownContent(article.markdown)

    return { article, content }
  } catch(error){
    console.error('Error loading markdown:', error)
    return {
      article,
      content: `# Ошибка загрузки контента\n${error}`
    }
  }

}

export default async function NewsDetail(
  { params }: 
  { params: { slug: string } 
}) {
  const { article, content } = await getNewsItem(await params.slug)

  return (
    <AnimatedDiv>
      <div className="bg-white">
        {/* Фото во весь экран */}
        <FullWidthImage article={article}/>

        {/* Контент */}
        <div className="max-w-7xl mx-auto px-0 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Основной текст */}
            <MarkdownContent content={content}/>

            {/* Боковая панель */}
            <NewsSidebar article={article} />
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};
