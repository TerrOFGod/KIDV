import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { SubskillDto } from './subskill.dto';

export class StaffSkillDto {
  @IsString()
  name: string;

  @IsNumber()
  level: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubskillDto)
  subskills?: SubskillDto[];
}
