export declare namespace CommentList {
    const topic = "account.list.query";
    class Request {
        gameId: string;
    }
    class Response {
        comments: Array<{
            _id: string;
            content: string;
            author: {
                displayName: string;
                role: string;
            };
            createdAt: string;
            replies: any[];
        }>;
    }
}
