import { Body, Controller } from '@nestjs/common';
import {
  PortfolioCreate,
  PortfolioUpdate,
  PortfolioDelete,
  PortfolioGetBySlug,
  PortfolioGetList,
  HealthCheck,
} from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { PortfolioService } from './portfolio.service';

@Controller()
export class PortfolioCommands {
  constructor(private readonly portfolioService: PortfolioService) {}

  @RMQValidate()
  @RMQRoute(PortfolioCreate.topic)
  async createPortfolio(@Body() dto: PortfolioCreate.Request): Promise<PortfolioCreate.Response> {
    return this.portfolioService.createPortfolio(dto);
  }

  @RMQValidate()
  @RMQRoute(PortfolioUpdate.topic)
  async updatePortfolio(@Body() dto: PortfolioUpdate.Request): Promise<PortfolioUpdate.Response> {
    return this.portfolioService.updatePortfolio(dto);
  }

  @RMQValidate()
  @RMQRoute(PortfolioDelete.topic)
  async deletePortfolio(@Body() { id }: PortfolioDelete.Request): Promise<PortfolioDelete.Response> {
    return this.portfolioService.deletePortfolio(id);
  }

  @RMQValidate()
  @RMQRoute(PortfolioGetBySlug.topic)
  async getPortfolioBySlug(@Body() { slug }: PortfolioGetBySlug.Request): Promise<PortfolioGetBySlug.Response> {
    const portfolio = await this.portfolioService.getPortfolioBySlug(slug);
    return { portfolio };
  }

  @RMQValidate()
  @RMQRoute(PortfolioGetList.topic)
  async getPortfolioList(@Body() dto: PortfolioGetList.Request): Promise<PortfolioGetList.Response> {
    const portfolio = await this.portfolioService.getPortfolioList(dto.category, dto.hallOfFrame);
    return { portfolio };
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'portfolio') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'portfolio',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'portfolio',
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
          service: 'portfolio',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
