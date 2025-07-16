declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
export declare namespace AccountChangePasswordProfile {
    const topic = "account.change-password-profile.command";
    class Request {
        id: string;
        passwords: ChangePasswordDto;
    }
    class Response {
        success: boolean;
    }
}
export {};
