import { IsString, IsNumber, IsOptional } from 'class-validator';

export class SuccessStoryCreateDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsString()
  city: string;

  @IsString()
  graduate: string;

  @IsString()
  project: string;

  @IsNumber()
  year: number;

  @IsString()
  description: string;

  @IsString()
  link: string;

  @IsString()
  image: string;
}
