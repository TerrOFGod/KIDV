import { Body, Controller } from '@nestjs/common';
import { StaffCreate, StaffUpdate, StaffDelete, HealthCheck } from '@shared/contracts';
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
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    try {
      await this.staffService.getStaffList();
      return {
        status: 'ok',
        service: 'staff',
        timestamp: new Date().toISOString(),
        details: {
          database: 'connected',
        },
      };
    } catch (error) {
      if (error instanceof Error)
        return {
          status: 'error',
          service: 'staff',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
