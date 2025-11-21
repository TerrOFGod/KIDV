import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsEnum } from 'class-validator';
import { StaffCreateDto } from './dtos/staff.create.dto';

export namespace StaffUpdate {
  export const topic = 'staff.update.command';
  export class Request extends StaffCreateDto {
    @IsString()
    id: string;
  }
  export class Response {
    success: boolean;
  }
}
