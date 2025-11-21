import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { PortfolioService } from './portfolio.service';

export namespace PortfolioSearch {
  export const topic = 'portfolio.search.query';
  export class Request {
    query: string;
  }
  export class Response {
    portfolio: any[];
  }
}

@Controller()
export class PortfolioQueries {
  constructor(private readonly portfolioService: PortfolioService) {}

  @RMQValidate()
  @RMQRoute(PortfolioSearch.topic)
  async searchPortfolio(@Body() { query }: PortfolioSearch.Request): Promise<PortfolioSearch.Response> {
    const portfolio = await this.portfolioService.searchPortfolio(query);
    return { portfolio };
  }
}
