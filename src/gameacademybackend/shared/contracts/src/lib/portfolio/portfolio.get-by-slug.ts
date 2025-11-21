import { IsString } from 'class-validator';

export namespace PortfolioGetBySlug {
  export const topic = 'portfolio.get-by-slug.query';
  export class Request {
    @IsString()
    slug: string;
  }
  export class Response {
    portfolio: any;
  }
}
