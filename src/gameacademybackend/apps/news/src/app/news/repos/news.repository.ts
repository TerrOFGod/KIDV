import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsEntity } from '../entities/news.entity';
import { News } from '../models/news.model';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(News.name) private readonly newsModel: Model<News>) {}

  async createNews(news: NewsEntity) {
    const newNews = new this.newsModel(news);
    return newNews.save();
  }

  async findNewsBySlug(slug: string) {
    return this.newsModel.findOne({ slug }).exec();
  }

  async findNewsById(id: string) {
    return this.newsModel.findById(id).exec();
  }

  async findAllNews(category?: string, search?: string) {
    const filter: any = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: 'i' } }, { 'author.name': { $regex: search, $options: 'i' } }];
    }
    return this.newsModel.find(filter).sort({ date: -1 }).exec();
  }

  async updateNews(id: string, news: Partial<NewsEntity>) {
    return this.newsModel.findByIdAndUpdate(id, news, { new: true }).exec();
  }

  async deleteNews(id: string) {
    return this.newsModel.findByIdAndDelete(id).exec();
  }
}
