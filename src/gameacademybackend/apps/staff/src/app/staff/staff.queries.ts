import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { StaffService } from './staff.service';

export namespace StaffSearch {
  export const topic = 'staff.search.query';
  export class Request {
    query: string;
  }
  export class Response {
    staff: any[];
  }
}

@Controller()
export class StaffQueries {
  constructor(private readonly staffService: StaffService) {}

  @RMQValidate()
  @RMQRoute(StaffSearch.topic)
  async searchStaff(@Body() { query }: StaffSearch.Request): Promise<StaffSearch.Response> {
    const staff = await this.staffService.searchStaff(query);
    return { staff };
  }
}