import { INews } from '@shared/interfaces';
import { Types } from 'mongoose';

export class NewsEntity implements INews {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image: string;
  date: string;
  markdown: string;
  author?: { name: string; slug: string };

  constructor(news: Partial<NewsEntity>) {
    this._id = news._id;
    this.slug = news.slug;
    this.title = news.title;
    this.category = news.category;
    this.image = news.image;
    this.date = news.date;
    this.markdown = news.markdown;
    this.author = news.author;
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
      author: this.author,
    };
  }
}