import { Body, Controller } from '@nestjs/common';
import { 
  SuccessStoryCreate, 
  SuccessStoryUpdate, 
  SuccessStoryDelete, 
  SuccessStoryGetList 
} from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { SuccessStoryService } from './success-story.service';

@Controller()
export class SuccessStoryCommands {
  constructor(private readonly successStoryService: SuccessStoryService) {}

  @RMQValidate()
  @RMQRoute(SuccessStoryCreate.topic)
  async createSuccessStory(@Body() dto: SuccessStoryCreate.Request): Promise<SuccessStoryCreate.Response> {
    return this.successStoryService.createSuccessStory(dto);
  }

  @RMQValidate()
  @RMQRoute(SuccessStoryUpdate.topic)
  async updateSuccessStory(@Body() dto: SuccessStoryUpdate.Request): Promise<SuccessStoryUpdate.Response> {
    return this.successStoryService.updateSuccessStory(dto);
  }

  @RMQValidate()
  @RMQRoute(SuccessStoryDelete.topic)
  async deleteSuccessStory(@Body() { id }: SuccessStoryDelete.Request): Promise<SuccessStoryDelete.Response> {
    return this.successStoryService.deleteSuccessStory(id);
  }

  @RMQValidate()
  @RMQRoute(SuccessStoryGetList.topic)
  async getSuccessStories(@Body() dto: SuccessStoryGetList.Request): Promise<SuccessStoryGetList.Response> {
    const stories = await this.successStoryService.getSuccessStories(dto.year, dto.city);
    return { stories };
  }
}