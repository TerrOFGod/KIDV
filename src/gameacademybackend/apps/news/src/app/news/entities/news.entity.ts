import { INews } from '@shared/interfaces';
import { Types } from 'mongoose';

export class NewsEntity implements INews {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image?: string; // Для локальных и внешних изображений
  date: string;
  markdown?: string;
  excerpt?: string;
  content?: string;
  readTime?: string;
  author?: { name: string; slug: string }; // Опциональный идентификатор автора
  tags?: string[];

  constructor(news: Partial<NewsEntity>) {
    this._id = news._id;
    this.slug = news.slug;
    this.title = news.title;
    this.category = news.category;
    this.image = news.image;
    this.date = news.date;
    this.markdown = news.markdown;
    this.excerpt = news.excerpt;
    this.content = news.content;
    this.readTime = news.readTime;
    this.author = news.author;
    this.tags = news.tags;
  }

  public getPublicInfo() {
    return {
      _id: this._id,
      slug: this.slug,
      title: this.title,
      category: this.category,
      image: this.image,
      date: this.date,
      markdown: this.markdown,
      excerpt: this.excerpt,
      content: this.content,
      readTime: this.readTime,
      author: this.author,
      tags: this.tags,
    };
  }
}
