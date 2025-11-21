import { PortfolioCreateDto } from './dtos/portfolio.create.dto';

export namespace PortfolioCreate {
  export const topic = 'portfolio.create.command';
  export class Request extends PortfolioCreateDto {}
  export class Response {
    id: string;
    slug: string;
  }
}
