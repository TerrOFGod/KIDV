import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, ValidateNested } from 'class-validator';

export namespace PortfolioGetList {
  export const topic = 'portfolio.get-list.query';
  export class Request {
    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsBoolean()
    hallOfFrame?: boolean;
  }
  export class Response {
    portfolio: any[];
  }
}