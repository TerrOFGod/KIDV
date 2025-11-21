import { Injectable } from '@nestjs/common';
import { NewsRepository } from './repos/news.repository';
import { NewsEntity } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async createNews(dto: any) {
    const existingNews = await this.newsRepository.findNewsBySlug(dto.slug);
    if (existingNews) {
      throw new Error('News with this slug already exists');
    }

    const newsEntity = new NewsEntity(dto);
    const newNews = await this.newsRepository.createNews(newsEntity);
    return { id: newNews._id.toString(), slug: newNews.slug };
  }

  async getNewsBySlug(slug: string) {
    const news = await this.newsRepository.findNewsBySlug(slug);
    if (!news) {
      throw new Error('News not found');
    }
    return new NewsEntity(news.toObject()).getPublicInfo();
  }

  async getNewsById(id: string) {
    const news = await this.newsRepository.findNewsById(id);
    if (!news) {
      throw new Error('News not found');
    }
    return new NewsEntity(news.toObject()).getPublicInfo();
  }

  async getNewsList(category?: string, search?: string) {
    const news = await this.newsRepository.findAllNews(category, search);
    return news.map((item) => new NewsEntity(item.toObject()).getPublicInfo());
  }

  async updateNews(dto: any) {
    const existingNews = await this.newsRepository.findNewsById(dto.id);
    if (!existingNews) {
      throw new Error('News not found');
    }

    const newsEntity = new NewsEntity(dto);
    await this.newsRepository.updateNews(dto.id, newsEntity);
    return { success: true };
  }

  async deleteNews(id: string) {
    const result = await this.newsRepository.deleteNews(id);
    if (!result) {
      throw new Error('News not found');
    }
    return { success: true };
  }
}
