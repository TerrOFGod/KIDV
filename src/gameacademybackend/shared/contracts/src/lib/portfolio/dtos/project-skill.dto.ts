import { IsString, IsNumber } from 'class-validator';

export class ProjectSkillDto {
  @IsString()
  name: string;

  @IsNumber()
  level: number;
}
