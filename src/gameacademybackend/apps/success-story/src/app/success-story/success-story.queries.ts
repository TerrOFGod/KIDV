import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { SuccessStoryService } from './success-story.service';

export namespace SuccessStoryGetByLocation {
  export const topic = 'success-story.get-by-location.query';
  export class Request {
    lat: number;
    lng: number;
    radius?: number;
  }
  export class Response {
    stories: any[];
  }
}

@Controller()
export class SuccessStoryQueries {
  constructor(private readonly successStoryService: SuccessStoryService) {}

  @RMQValidate()
  @RMQRoute(SuccessStoryGetByLocation.topic)
  async getStoriesByLocation(
    @Body() dto: SuccessStoryGetByLocation.Request,
  ): Promise<SuccessStoryGetByLocation.Response> {
    const stories = await this.successStoryService.getStoriesByLocation(dto.lat, dto.lng, dto.radius || 10000);
    return { stories };
  }
}
