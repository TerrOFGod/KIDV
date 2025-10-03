import { IsOptional, IsString } from 'class-validator';

export class NewsAuthorDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}