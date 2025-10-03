import { IsString, IsNumber, IsOptional } from 'class-validator';

export namespace SuccessStoryGetList {
  export const topic = 'success-story.get-list.query';
  export class Request {
    @IsOptional()
    @IsNumber()
  year?: number;

    @IsOptional()
    @IsString()
    city?: string;
  }
  export class Response {
    stories: any[];
  }
}