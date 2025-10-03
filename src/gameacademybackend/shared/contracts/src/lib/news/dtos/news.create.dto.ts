import { IsString, IsOptional, IsArray, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { NewsAuthorDto } from './news.author.dto';

export class NewsCreateDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  image: string;

  @IsDateString()
  date: string;

  @IsString()
  markdown: string;

  @IsOptional()
  @Type(() => NewsAuthorDto)
  author?: NewsAuthorDto;
}