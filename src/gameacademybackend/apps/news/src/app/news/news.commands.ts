import { Body, Controller } from '@nestjs/common';
import {
  NewsCreate,
  NewsUpdate,
  NewsDelete,
  NewsGetById,
  NewsGetBySlug,
  NewsGetList,
  HealthCheck,
} from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { NewsService } from './news.service';

@Controller()
export class NewsCommands {
  constructor(private readonly newsService: NewsService) {}

  @RMQValidate()
  @RMQRoute(NewsCreate.topic)
  async createNews(@Body() dto: NewsCreate.Request): Promise<NewsCreate.Response> {
    return this.newsService.createNews(dto);
  }

  @RMQValidate()
  @RMQRoute(NewsUpdate.topic)
  async updateNews(@Body() dto: NewsUpdate.Request): Promise<NewsUpdate.Response> {
    return this.newsService.updateNews(dto);
  }

  @RMQValidate()
  @RMQRoute(NewsDelete.topic)
  async deleteNews(@Body() { id }: NewsDelete.Request): Promise<NewsDelete.Response> {
    return this.newsService.deleteNews(id);
  }

  @RMQValidate()
  @RMQRoute(NewsGetById.topic)
  async getNewsById(@Body() { id }: NewsGetById.Request): Promise<NewsGetById.Response> {
    const news = await this.newsService.getNewsById(id);
    return { news };
  }

  @RMQValidate()
  @RMQRoute(NewsGetBySlug.topic)
  async getNewsBySlug(@Body() { slug }: NewsGetBySlug.Request): Promise<NewsGetBySlug.Response> {
    const news = await this.newsService.getNewsBySlug(slug);
    return { news };
  }

  @RMQValidate()
  @RMQRoute(NewsGetList.topic)
  async getNewsList(@Body() dto: NewsGetList.Request): Promise<NewsGetList.Response> {
    const news = await this.newsService.getNewsList(dto.category, dto.search);
    return { news };
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'news') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'news',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'news',
        timestamp: new Date().toISOString(),
        details: {
          database: 'connected',
          memory: process.memoryUsage(),
          uptime: process.uptime(),
        },
      };
    } catch (error) {
      if (error instanceof Error)
        return {
          status: 'error',
          service: 'news',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
