import { Body, Controller } from '@nestjs/common';
import { 
  StaffCreate, 
  StaffUpdate, 
  StaffDelete, 
  StaffGetBySlug, 
  StaffGetList 
} from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { StaffService } from './staff.service';

@Controller()
export class StaffCommands {
  constructor(private readonly staffService: StaffService) {}

  @RMQValidate()
  @RMQRoute(StaffCreate.topic)
  async createStaff(@Body() dto: StaffCreate.Request): Promise<StaffCreate.Response> {
    return this.staffService.createStaff(dto);
  }

  @RMQValidate()
  @RMQRoute(StaffUpdate.topic)
  async updateStaff(@Body() dto: StaffUpdate.Request): Promise<StaffUpdate.Response> {
    return this.staffService.updateStaff(dto);
  }

  @RMQValidate()
  @RMQRoute(StaffDelete.topic)
  async deleteStaff(@Body() { id }: StaffDelete.Request): Promise<StaffDelete.Response> {
    return this.staffService.deleteStaff(id);
  }

  @RMQValidate()
  @RMQRoute(StaffGetBySlug.topic)
  async getStaffBySlug(@Body() { slug }: StaffGetBySlug.Request): Promise<StaffGetBySlug.Response> {
    const staff = await this.staffService.getStaffBySlug(slug);
    return { staff };
  }

  @RMQValidate()
  @RMQRoute(StaffGetList.topic)
  async getStaffList(@Body() dto: StaffGetList.Request): Promise<StaffGetList.Response> {
    const staff = await this.staffService.getStaffList(dto.position, dto.rarity);
    return { staff };
  }
}