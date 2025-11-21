import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectSkillDto } from './project-skill.dto';

export class ProjectPhaseDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectSkillDto)
  skills?: ProjectSkillDto[];
}
