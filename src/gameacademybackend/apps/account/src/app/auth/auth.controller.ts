import { Body, Controller } from '@nestjs/common';
import { AccountLogin, AccountRegister, HealthCheck } from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @RMQValidate()
  @RMQRoute(AccountRegister.topic)
  async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    return this.authService.register(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return this.authService.login(id.toString());
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'auth') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'auth',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'auth',
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
          service: 'auth',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
