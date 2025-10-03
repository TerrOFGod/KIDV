import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, ValidateNested } from 'class-validator';

export class ProjectSkillDto {
  @IsString()
  name: string;

  @IsNumber()
  level: number;
}