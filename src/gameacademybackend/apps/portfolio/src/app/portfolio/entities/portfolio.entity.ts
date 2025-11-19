/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPortfolio } from '@shared/interfaces';
import { Types } from 'mongoose';

export class PortfolioEntity implements IPortfolio {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image?: string;
  description?: string;
  releaseDate?: string;
  download?: string;
  phases?: Array<{
    title: string;
    date: string;
    description: string;
    skills?: Array<{ name: string; level: number }>;
  }>;
  goals?: string[];
  features?: string[];
  screenshots?: string[];
  hallOfFame?: boolean;
  authors?: Array<{
    name: string;
    slug: string;
    role: string;
  }>;
  year?: number;
  markdown?: string;
  tags?: string[];

  constructor(portfolio: Partial<PortfolioEntity>) {
    this._id = portfolio._id;
    this.slug = portfolio.slug || '';
    this.title = portfolio.title || '';
    this.category = portfolio.category || '';
    this.image = portfolio.image;
    this.description = portfolio.description;
    this.releaseDate = portfolio.releaseDate;
    this.download = portfolio.download;
    this.phases = portfolio.phases;
    this.goals = portfolio.goals;
    this.features = portfolio.features;
    this.screenshots = portfolio.screenshots;
    this.hallOfFame = portfolio.hallOfFame;
    this.authors = portfolio.authors;
    this.year = portfolio.year;
    this.markdown = portfolio.markdown;
    this.tags = portfolio.tags;
  }

  public getPublicInfo() {
    return {
      _id: this._id?.toString(),
      slug: this.slug,
      title: this.title,
      category: this.category,
      image: this.image,
      description: this.description,
      releaseDate: this.releaseDate,
      download: this.download,
      phases: this.phases,
      goals: this.goals,
      features: this.features,
      screenshots: this.screenshots,
      hallOfFame: this.hallOfFame,
      authors: this.authors,
      year: this.year,
      markdown: this.markdown,
      tags: this.tags,
    };
  }
}
