import { IsOptional, IsString } from 'class-validator';
import { NewsCreateDto } from './news.create.dto';

export class NewsUpdateDto extends NewsCreateDto {
  @IsString()
  id: string;
}