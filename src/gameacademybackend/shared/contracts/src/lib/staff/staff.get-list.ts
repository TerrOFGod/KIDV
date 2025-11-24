import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsEnum } from 'class-validator';

export namespace StaffGetList {
  export const topic = 'staff.get-list.query';
  export class Request {
    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsString()
    rarity?: string;
  }
  export class Response {
    staff: {
      _id?: string;
      slug: string;
      name: string;
      position: string;
      photo?: string;
      title?: string;
      rarity?: 'LEGENDARY' | 'RARE' | 'COMMON';
      email?: string;
      telegram?: string;
      github?: string;
      bio?: string;
      researchInterests?: string[];
      stats?: Array<{ label: string; value: number }>;
      skills?: Array<{
        name: string;
        level: number;
        description?: string;
        subskills?: Array<{ name: string; description?: string }>;
      }>;
      achievements?: Array<{
        title: string;
        icon: string;
        description: string;
      }>;
      // Устаревшие/альтернативные поля
      id?: string | number;
      image?: string;
      tags?: string[];
      contact?: string;
    }[];
  }
}
