import { IsOptional, IsString } from 'class-validator';

export namespace NewsGetBySlug {
  export const topic = 'news.get-by-slug.query';
  export class Request {
    @IsString()
    slug: string;
  }
  export class Response {
    news: any;
  }
}