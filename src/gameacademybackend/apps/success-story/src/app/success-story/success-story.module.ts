import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuccessStory, SuccessStorySchema } from './models/success-story.model';
import { SuccessStoryRepository } from './repos/success-story.repository';
import { SuccessStoryCommands } from './success-story.commands';
import { SuccessStoryQueries } from './success-story.queries';
import { SuccessStoryService } from './success-story.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SuccessStory.name, schema: SuccessStorySchema }])],
  providers: [SuccessStoryRepository, SuccessStoryService],
  controllers: [SuccessStoryCommands, SuccessStoryQueries],
})
export class SuccessStoryModule {}