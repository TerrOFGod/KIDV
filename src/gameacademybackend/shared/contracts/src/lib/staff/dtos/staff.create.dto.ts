import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PositionDto } from './position.dto';
import { ContactDto } from './contact.dto';
import { StaffStatDto } from './staff-stat.dto';
import { StaffSkillDto } from './staff-skill.dto';
import { StaffAchievementDto } from './staff-achievement.dto';

export class StaffCreateDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PositionDto)
  positions: PositionDto[];

  @IsString()
  educationLevel: string;

  @IsString()
  researchPosition: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StaffStatDto)
  stats?: StaffStatDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StaffSkillDto)
  skills?: StaffSkillDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StaffAchievementDto)
  achievements?: StaffAchievementDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contact?: ContactDto[];
}
