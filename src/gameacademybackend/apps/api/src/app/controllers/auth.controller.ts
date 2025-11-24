import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@shared/contracts';
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthContoller {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService.send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, dto);
    } catch (e) {
      if (e instanceof Error) throw new UnauthorizedException(e.message);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) throw new UnauthorizedException(e.message);
    }
  }

  // В gateway для проверки всех сервисов
  @Get('health')
  async health() {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'news'];
    const results = [];

    for (const service of services) {
      try {
        const result = await this.rmqService.send(`${service}.health.check`, {});
        results.push({ service, status: 'ok', data: result });
      } catch (e) {
        if (e instanceof Error) results.push({ service, status: 'error', error: e.message });
      }
    }

    return results;
  }
}
