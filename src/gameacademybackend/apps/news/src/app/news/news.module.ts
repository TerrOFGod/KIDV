import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './models/news.model';
import { NewsRepository } from './repos/news.repository';
import { NewsCommands } from './news.commands';
import { NewsService } from './news.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }])],
  providers: [NewsRepository, NewsService],
  controllers: [NewsCommands],
})
export class NewsModule {}
