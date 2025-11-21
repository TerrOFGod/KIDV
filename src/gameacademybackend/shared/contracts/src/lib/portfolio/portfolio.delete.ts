import { IsString } from 'class-validator';

export namespace PortfolioDelete {
  export const topic = 'portfolio.delete.command';
  export class Request {
    @IsString()
    id: string;
  }
  export class Response {
    success: boolean;
  }
}
