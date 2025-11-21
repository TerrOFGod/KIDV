import { IsString } from 'class-validator';

export class ProjectAuthorDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  role: string;
}
