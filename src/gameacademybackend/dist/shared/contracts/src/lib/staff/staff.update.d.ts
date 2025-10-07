import { StaffCreateDto } from './dtos/staff.create.dto';
export declare namespace StaffUpdate {
    const topic = "staff.update.command";
    class Request extends StaffCreateDto {
        id: string;
    }
    class Response {
        success: boolean;
    }
}
