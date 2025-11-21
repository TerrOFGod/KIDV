import { IsOptional, IsString } from 'class-validator';

export namespace NewsDelete {
  export const topic = 'news.delete.command';
  export class Request {
    @IsString()
    id: string;
  }
  export class Response {
    success: boolean;
  }
}
