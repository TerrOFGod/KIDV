/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import {
  PortfolioCreate,
  PortfolioUpdate,
  PortfolioDelete,
  PortfolioGetBySlug,
  PortfolioGetList
} from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async getPortfolioList(@Query('category') category?: string, @Query('hallOfFrame') hallOfFrame?: boolean) {
    return this.rmqService.send<PortfolioGetList.Request, PortfolioGetList.Response>(
      PortfolioGetList.topic,
      { category, hallOfFrame }
    );
  }

  @Get(':slug')
  async getPortfolioBySlug(@Param('slug') slug: string) {
    return this.rmqService.send<PortfolioGetBySlug.Request, PortfolioGetBySlug.Response>(
      PortfolioGetBySlug.topic,
      { slug }
    );
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async createPortfolio(@Body() dto: PortfolioCreate.Request) {
    return this.rmqService.send<PortfolioCreate.Request, PortfolioCreate.Response>(
      PortfolioCreate.topic,
      dto
    );
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async updatePortfolio(@Param('id') id: string, @Body() dto: PortfolioCreate.Request) {
    return this.rmqService.send<PortfolioUpdate.Request, PortfolioUpdate.Response>(
      PortfolioUpdate.topic,
      { ...dto, id }
    );
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async deletePortfolio(@Param('id') id: string) {
    return this.rmqService.send<PortfolioDelete.Request, PortfolioDelete.Response>(
      PortfolioDelete.topic,
      { id }
    );
  }
}
