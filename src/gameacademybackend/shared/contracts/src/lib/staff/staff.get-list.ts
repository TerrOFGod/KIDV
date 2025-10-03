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
    staff: any[];
  }
}