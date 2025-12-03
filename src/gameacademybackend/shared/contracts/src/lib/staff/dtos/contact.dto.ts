import { IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  title: string;

  @IsString()
  value: string;
}
