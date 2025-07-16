export declare namespace AccountRegister {
    const topic = "account.register.command";
    class Request {
        email: string;
        password: string;
        displayName?: string;
    }
    class Response {
        email: string;
    }
}
