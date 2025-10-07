export declare namespace StaffDelete {
    const topic = "staff.delete.command";
    class Request {
        id: string;
    }
    class Response {
        success: boolean;
    }
}
