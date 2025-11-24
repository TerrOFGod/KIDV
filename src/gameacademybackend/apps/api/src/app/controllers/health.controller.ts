// gateway/health.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { HealthCheck } from '@shared/contracts';

interface HealthResult {
  service: string;
  status: 'ok' | 'error';
  response?: HealthCheck.Response;
  error?: string;
  responseTime?: number;
}

@Controller('health')
export class HealthController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async checkAll(): Promise<{ results: HealthResult[]; timestamp: string }> {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'success']; // Список ваших сервисов
    const results: HealthResult[] = [];

    for (const service of services) {
      const startTime = Date.now();

      try {
        const response = await this.rmqService.send<HealthCheck.Request, HealthCheck.Response>(
          HealthCheck.topic,
          { service },
          { timeout: 5000 }, // Таймаут 5 секунд на каждый сервис
        );

        results.push({
          service,
          status: response.status,
          response,
          responseTime: Date.now() - startTime,
        });
      } catch (error) {
        if (error instanceof Error)
          results.push({
            service,
            status: 'error',
            error: error.message,
            responseTime: Date.now() - startTime,
          });
      }
    }

    return {
      results,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':service')
  async checkService(@Param('service') service: string): Promise<HealthResult> {
    const startTime = Date.now();

    try {
      const response = await this.rmqService.send<HealthCheck.Request, HealthCheck.Response>(HealthCheck.topic, {
        service,
      });

      return {
        service,
        status: response.status,
        response,
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      if (error instanceof Error)
        return {
          service,
          status: 'error',
          error: error.message,
          responseTime: Date.now() - startTime,
        };
    }
  }
}
