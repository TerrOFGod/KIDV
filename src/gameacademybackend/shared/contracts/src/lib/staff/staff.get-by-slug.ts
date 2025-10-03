import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsEnum } from 'class-validator';

export namespace StaffGetBySlug {
  export const topic = 'staff.get-by-slug.query';
  export class Request {
    @IsString()
    slug: string;
  }
  export class Response {
    staff: any;
  }
}