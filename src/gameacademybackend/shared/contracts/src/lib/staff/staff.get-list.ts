import { IsString, IsOptional } from 'class-validator';

export namespace StaffGetList {
  export const topic = 'staff.get-list.query';
  export class Request {
    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsString()
    researchPosition?: string;
  }
  export class Response {
    staff: Array<{
      _id?: string;
      name: string;
      positions: Array<{ type: string; value: string }>;
      educationLevel: string;
      researchPosition: string;
      photo?: string;
      bio?: string;
      stats?: Array<{ label: string; value: number }>;
      skills?: Array<{
        name: string;
        level: string;
        description?: string;
        subskills?: Array<{ name: string; description?: string }>;
      }>;
      achievements?: Array<{
        title: string;
        icon: string;
        description: string;
      }>;
      tags?: string[];
      contact?: Array<{ title: string; value: string }>;
    }>;
  }
}
