export declare namespace AccountDeleteUser {
    const topic = "account.delete-user.command";
    class Request {
        email: string;
    }
    class Response {
        success: boolean;
    }
}
