import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsEnum } from 'class-validator';

export namespace StaffDelete {
  export const topic = 'staff.delete.command';
  export class Request {
    @IsString()
    id: string;
  }
  export class Response {
    success: boolean;
  }
}
