import { IsString, IsNumber, IsOptional } from 'class-validator';
import { SuccessStoryCreateDto } from './dtos/success-story.create.dto';

export namespace SuccessStoryUpdate {
  export const topic = 'success-story.update.command';
  export class Request extends SuccessStoryCreateDto {
    @IsString()
    id: string;
  }
  export class Response {
    success: boolean;
  }
}
