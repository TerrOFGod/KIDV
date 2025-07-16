export declare namespace CommentCreate {
    const topic = "account.create.command";
    class Request {
        gameId: string;
        parent?: string;
        content: string;
        userId: string;
    }
    class Response {
        _id: string;
        content: string;
        author: {
            displayName: string;
            role: string;
            _id: string;
        };
        createdAt: string;
        parent?: string;
    }
}
