import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { 
  NewsCreate, 
  NewsUpdate, 
  NewsDelete, 
  NewsGetBySlug, 
  NewsGetList 
} from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('news')
export class NewsController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async getNewsList(@Query('category') category?: string, @Query('search') search?: string) {
    return this.rmqService.send<NewsGetList.Request, NewsGetList.Response>(
      NewsGetList.topic, 
      { category, search }
    );
  }

  @Get(':slug')
  async getNewsBySlug(@Param('slug') slug: string) {
    return this.rmqService.send<NewsGetBySlug.Request, NewsGetBySlug.Response>(
      NewsGetBySlug.topic, 
      { slug }
    );
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async createNews(@Body() dto: NewsCreate.Request) {
    return this.rmqService.send<NewsCreate.Request, NewsCreate.Response>(
      NewsCreate.topic, 
      dto
    );
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async updateNews(@Param('id') id: string, @Body() dto: NewsCreate.Request) {
    return this.rmqService.send<NewsUpdate.Request, NewsUpdate.Response>(
      NewsUpdate.topic, 
      { ...dto, id }
    );
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async deleteNews(@Param('id') id: string) {
    return this.rmqService.send<NewsDelete.Request, NewsDelete.Response>(
      NewsDelete.topic, 
      { id }
    );
  }
}