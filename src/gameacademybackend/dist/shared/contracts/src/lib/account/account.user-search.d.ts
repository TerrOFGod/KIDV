export declare namespace UserSearch {
    const topic = "users.search.query";
    class Request {
        query?: string;
    }
    class Response {
        users: Array<{
            _id: string;
            email: string;
            displayName?: string;
            role: string;
        }>;
    }
}
