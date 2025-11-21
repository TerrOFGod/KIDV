import { IsString, IsOptional } from 'class-validator';

export class SubskillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
