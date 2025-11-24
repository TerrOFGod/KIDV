import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { SuccessStoryCreate, SuccessStoryUpdate, SuccessStoryDelete, SuccessStoryGetList } from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('success-stories')
export class SuccessStoryController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async getSuccessStories(@Query('year') year?: number, @Query('city') city?: string) {
    return this.rmqService.send<SuccessStoryGetList.Request, SuccessStoryGetList.Response>(SuccessStoryGetList.topic, {
      year: year ? parseInt(year.toString()) : undefined,
      city,
    });
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async createSuccessStory(@Body() dto: SuccessStoryCreate.Request) {
    return this.rmqService.send<SuccessStoryCreate.Request, SuccessStoryCreate.Response>(SuccessStoryCreate.topic, dto);
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async updateSuccessStory(@Param('id') id: string, @Body() dto: SuccessStoryCreate.Request) {
    return this.rmqService.send<SuccessStoryUpdate.Request, SuccessStoryUpdate.Response>(SuccessStoryUpdate.topic, {
      ...dto,
      id,
    });
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async deleteSuccessStory(@Param('id') id: string) {
    return this.rmqService.send<SuccessStoryDelete.Request, SuccessStoryDelete.Response>(SuccessStoryDelete.topic, {
      id,
    });
  }

  @Get('health')
  async health() {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'success'];
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
