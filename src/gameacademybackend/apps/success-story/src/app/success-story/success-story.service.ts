import { Injectable } from '@nestjs/common';
import { SuccessStoryRepository } from './repos/success-story.repository';
import { SuccessStoryEntity } from './entities/success-story.entity';

@Injectable()
export class SuccessStoryService {
  constructor(private readonly successStoryRepository: SuccessStoryRepository) {}

  async createSuccessStory(dto: any) {
    const successStoryEntity = new SuccessStoryEntity(dto);
    const newSuccessStory = await this.successStoryRepository.createSuccessStory(successStoryEntity);
    return { id: newSuccessStory._id.toString() };
  }

  async getSuccessStoryById(id: string) {
    const successStory = await this.successStoryRepository.findSuccessStoryById(id);
    if (!successStory) {
      throw new Error('Success story not found');
    }
    return new SuccessStoryEntity(successStory.toObject()).getPublicInfo();
  }

  async getSuccessStories(year?: number, city?: string) {
    const stories = await this.successStoryRepository.findAllSuccessStories(year, city);
    return stories.map(item => new SuccessStoryEntity(item.toObject()).getPublicInfo());
  }

  async updateSuccessStory(dto: any) {
    const existingStory = await this.successStoryRepository.findSuccessStoryById(dto.id);
    if (!existingStory) {
      throw new Error('Success story not found');
    }

    const successStoryEntity = new SuccessStoryEntity(dto);
    await this.successStoryRepository.updateSuccessStory(dto.id, successStoryEntity);
    return { success: true };
  }

  async deleteSuccessStory(id: string) {
    const result = await this.successStoryRepository.deleteSuccessStory(id);
    if (!result) {
      throw new Error('Success story not found');
    }
    return { success: true };
  }

  async getStoriesByLocation(lat: number, lng: number, radius: number) {
    const stories = await this.successStoryRepository.getStoriesByLocation(lat, lng, radius);
    return stories.map(item => new SuccessStoryEntity(item.toObject()).getPublicInfo());
  }
}