import { IsString, IsNumber, IsOptional } from 'class-validator';

export namespace SuccessStoryDelete {
  export const topic = 'success-story.delete.command';
  export class Request {
    @IsString()
    id: string;
  }
  export class Response {
    success: boolean;
  }
}