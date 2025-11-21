import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsEnum } from 'class-validator';

export class StaffStatDto {
  @IsString()
  label: string;

  @IsNumber()
  value: number;
}
