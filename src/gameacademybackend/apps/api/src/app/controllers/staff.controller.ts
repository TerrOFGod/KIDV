import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { StaffCreate, StaffUpdate, StaffDelete, StaffGetBySlug, StaffGetList } from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('staff')
export class StaffController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async getStaffList(@Query('position') position?: string, @Query('rarity') rarity?: string) {
    return this.rmqService.send<StaffGetList.Request, StaffGetList.Response>(StaffGetList.topic, { position, rarity });
  }

  @Get(':slug')
  async getStaffBySlug(@Param('slug') slug: string) {
    return this.rmqService.send<StaffGetBySlug.Request, StaffGetBySlug.Response>(StaffGetBySlug.topic, { slug });
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async createStaff(@Body() dto: StaffCreate.Request) {
    return this.rmqService.send<StaffCreate.Request, StaffCreate.Response>(StaffCreate.topic, dto);
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async updateStaff(@Param('id') id: string, @Body() dto: StaffCreate.Request) {
    return this.rmqService.send<StaffUpdate.Request, StaffUpdate.Response>(StaffUpdate.topic, { ...dto, id });
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async deleteStaff(@Param('id') id: string) {
    return this.rmqService.send<StaffDelete.Request, StaffDelete.Response>(StaffDelete.topic, { id });
  }
}
