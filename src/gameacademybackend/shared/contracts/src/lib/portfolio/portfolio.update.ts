import { IsString } from 'class-validator';
import { PortfolioCreateDto } from './dtos/portfolio.create.dto';

export namespace PortfolioUpdate {
  export const topic = 'portfolio.update.command';
  export class Request extends PortfolioCreateDto {
    @IsString()
    id: string;
  }
  export class Response {
    success: boolean;
  }
}
