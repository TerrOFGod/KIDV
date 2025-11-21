import { StaffCreateDto } from './dtos/staff.create.dto';

export namespace StaffCreate {
  export const topic = 'staff.create.command';
  export class Request extends StaffCreateDto {}
  export class Response {
    id: string;
    slug: string;
  }
}
