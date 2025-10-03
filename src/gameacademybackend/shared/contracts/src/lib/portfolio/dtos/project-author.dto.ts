import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, ValidateNested } from 'class-validator';

export class ProjectAuthorDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  role: string;
}