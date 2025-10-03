import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortfolioEntity } from './../entities/portfolio.entity';
import { Portfolio } from './../models/portfolio.model';

@Injectable()
export class PortfolioRepository {
  constructor(@InjectModel(Portfolio.name) private readonly portfolioModel: Model<Portfolio>) {}

  async createPortfolio(portfolio: PortfolioEntity) {
    const newPortfolio = new this.portfolioModel(portfolio);
    return newPortfolio.save();
  }

  async findPortfolioBySlug(slug: string) {
    return this.portfolioModel.findOne({ slug }).exec();
  }

  async findPortfolioById(id: string) {
    return this.portfolioModel.findById(id).exec();
  }

  async findAllPortfolio(category?: string, hallOfFrame?: boolean) {
    const filter: any = {};
    if (category) filter.category = category;
    if (hallOfFrame !== undefined) filter.hallOfFrame = hallOfFrame;
    
    return this.portfolioModel.find(filter).sort({ year: -1 }).exec();
  }

  async updatePortfolio(id: string, portfolio: Partial<PortfolioEntity>) {
    return this.portfolioModel.findByIdAndUpdate(id, portfolio, { new: true }).exec();
  }

  async deletePortfolio(id: string) {
    return this.portfolioModel.findByIdAndDelete(id).exec();
  }

  async searchPortfolio(searchTerm: string) {
    return this.portfolioModel.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { 'authors.name': { $regex: searchTerm, $options: 'i' } }
      ]
    }).exec();
  }
}