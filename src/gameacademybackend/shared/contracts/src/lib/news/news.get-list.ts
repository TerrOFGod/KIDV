import { IsOptional, IsString } from 'class-validator';

export namespace NewsGetList {
  export const topic = 'news.get-list.query';
  export class Request {
    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    search?: string;
  }
  export class Response {
    news: any[];
  }
}