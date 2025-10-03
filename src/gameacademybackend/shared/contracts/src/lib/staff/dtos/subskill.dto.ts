import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsEnum } from 'class-validator';

export class SubskillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}