import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessStoryEntity } from './../entities/success-story.entity';
import { SuccessStory } from './../models/success-story.model';

@Injectable()
export class SuccessStoryRepository {
  constructor(@InjectModel(SuccessStory.name) private readonly successStoryModel: Model<SuccessStory>) {}

  async createSuccessStory(successStory: SuccessStoryEntity) {
    const newSuccessStory = new this.successStoryModel(successStory);
    return newSuccessStory.save();
  }

  async findSuccessStoryById(id: string) {
    return this.successStoryModel.findById(id).exec();
  }

  async findAllSuccessStories(year?: number, city?: string) {
    const filter: any = {};
    if (year) filter.year = year;
    if (city) filter.city = { $regex: city, $options: 'i' };
    
    return this.successStoryModel.find(filter).sort({ year: -1 }).exec();
  }

  async updateSuccessStory(id: string, successStory: Partial<SuccessStoryEntity>) {
    return this.successStoryModel.findByIdAndUpdate(id, successStory, { new: true }).exec();
  }

  async deleteSuccessStory(id: string) {
    return this.successStoryModel.findByIdAndDelete(id).exec();
  }

  async getStoriesByLocation(lat: number, lng: number, radius: number) {
    // Для геопоиска нужно добавить индекс в MongoDB
    return this.successStoryModel.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: radius
        }
      }
    }).exec();
  }
}