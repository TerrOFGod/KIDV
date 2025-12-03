import { StaffCreateDto } from './dtos/staff.create.dto';
export declare namespace StaffCreate {
    const topic = "staff.create.command";
    class Request extends StaffCreateDto {
    }
    class Response {
        id: string;
    }
}
