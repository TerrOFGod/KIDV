declare class ChangeProfileDto {
    displayName: string;
}
export declare namespace AccountChangeProfile {
    const topic = "account.change-profile.command";
    class Request {
        id: string;
        user: ChangeProfileDto;
    }
    class Response {
    }
}
export {};
