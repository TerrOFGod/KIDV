import { Injectable } from '@nestjs/common';
import { PortfolioRepository } from './repos/portfolio.repository';
import { PortfolioEntity } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(private readonly portfolioRepository: PortfolioRepository) {}

  async createPortfolio(dto: any) {
    const existingPortfolio = await this.portfolioRepository.findPortfolioBySlug(dto.slug);
    if (existingPortfolio) {
      throw new Error('Portfolio with this slug already exists');
    }

    const portfolioEntity = new PortfolioEntity(dto);
    const newPortfolio = await this.portfolioRepository.createPortfolio(portfolioEntity);
    return { id: newPortfolio._id.toString(), slug: newPortfolio.slug };
  }

  async getPortfolioBySlug(slug: string) {
    const portfolio = await this.portfolioRepository.findPortfolioBySlug(slug);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }
    return new PortfolioEntity(portfolio.toObject()).getPublicInfo();
  }

  async getPortfolioById(id: string) {
    const portfolio = await this.portfolioRepository.findPortfolioById(id);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }
    return new PortfolioEntity(portfolio.toObject()).getPublicInfo();
  }

  async getPortfolioList(category?: string, hallOfFrame?: boolean) {
    const portfolio = await this.portfolioRepository.findAllPortfolio(category, hallOfFrame);
    return portfolio.map(item => new PortfolioEntity(item.toObject()).getPublicInfo());
  }

  async updatePortfolio(dto: any) {
    const existingPortfolio = await this.portfolioRepository.findPortfolioById(dto.id);
    if (!existingPortfolio) {
      throw new Error('Portfolio not found');
    }

    const portfolioEntity = new PortfolioEntity(dto);
    await this.portfolioRepository.updatePortfolio(dto.id, portfolioEntity);
    return { success: true };
  }

  async deletePortfolio(id: string) {
    const result = await this.portfolioRepository.deletePortfolio(id);
    if (!result) {
      throw new Error('Portfolio not found');
    }
    return { success: true };
  }

  async searchPortfolio(searchTerm: string) {
    const portfolio = await this.portfolioRepository.searchPortfolio(searchTerm);
    return portfolio.map(item => new PortfolioEntity(item.toObject()).getPublicInfo());
  }
}