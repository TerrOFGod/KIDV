export declare namespace StaffGetList {
    const topic = "staff.get-list.query";
    class Request {
        position?: string;
        rarity?: string;
    }
    class Response {
        staff: any[];
    }
}
