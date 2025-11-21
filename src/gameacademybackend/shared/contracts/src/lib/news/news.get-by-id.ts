import { IsOptional, IsString } from 'class-validator';

export namespace NewsGetById {
  export const topic = 'news.get-by-id.query';
  export class Request {
    @IsString()
    id: string;
  }
  export class Response {
    news: any;
  }
}
