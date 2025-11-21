/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Rarity } from '../types/rarity.type';
import { StaffStatDto } from './staff-stat.dto';
import { StaffSkillDto } from './staff-skill.dto';
import { StaffAchievementDto } from './staff-achievement.dto';

export class StaffCreateDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(["LEGENDARY", "RARE", "COMMON"])
  rarity?: Rarity;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  researchInterests?: string[];

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

  // Устаревшие/альтернативные поля
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  contact?: string;
}
