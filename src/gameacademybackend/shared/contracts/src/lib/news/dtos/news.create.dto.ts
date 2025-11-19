import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { NewsAuthorDto } from './news.author.dto';

export class NewsCreateDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  markdown?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  readTime?: string;

  @IsOptional()
  @Type(() => NewsAuthorDto)
  author?: NewsAuthorDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
