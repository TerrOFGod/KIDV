import { IsString, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { SubskillDto } from './subskill.dto';
import { Level } from '../types/level.type';

export class StaffSkillDto {
  @IsString()
  name: string;

  @IsEnum(['Junior', 'Middle', 'Senior'])
  level: Level;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubskillDto)
  subskills?: SubskillDto[];
}
