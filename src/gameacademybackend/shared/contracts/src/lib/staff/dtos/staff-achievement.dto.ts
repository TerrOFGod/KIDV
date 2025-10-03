import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsEnum } from 'class-validator';

export class StaffAchievementDto {
  @IsString()
  title: string;

  @IsString()
  icon: string;

  @IsString()
  description: string;
}