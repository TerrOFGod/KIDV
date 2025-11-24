import { Body, Controller } from '@nestjs/common';
import {
  SuccessStoryCreate,
  SuccessStoryUpdate,
  SuccessStoryDelete,
  SuccessStoryGetList,
  HealthCheck,
} from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { SuccessStoryService } from './success-story.service';

@Controller()
export class SuccessStoryCommands {
  constructor(private readonly successStoryService: SuccessStoryService) {}

  @RMQValidate()
  @RMQRoute(SuccessStoryCreate.topic)
  async createSuccessStory(@Body() dto: SuccessStoryCreate.Request): Promise<SuccessStoryCreate.Response> {
    return this.successStoryService.createSuccessStory(dto);
  }

  @RMQValidate()
  @RMQRoute(SuccessStoryUpdate.topic)
  async updateSuccessStory(@Body() dto: SuccessStoryUpdate.Request): Promise<SuccessStoryUpdate.Response> {
    return this.successStoryService.updateSuccessStory(dto);
  }

  @RMQValidate()
  @RMQRoute(SuccessStoryDelete.topic)
  async deleteSuccessStory(@Body() { id }: SuccessStoryDelete.Request): Promise<SuccessStoryDelete.Response> {
    return this.successStoryService.deleteSuccessStory(id);
  }

  @RMQValidate()
  @RMQRoute(SuccessStoryGetList.topic)
  async getSuccessStories(@Body() dto: SuccessStoryGetList.Request): Promise<SuccessStoryGetList.Response> {
    const stories = await this.successStoryService.getSuccessStories(dto.year, dto.city);
    return { stories };
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'success') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'success',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'success',
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
          service: 'success',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
