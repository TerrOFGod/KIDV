export declare namespace NewsGetList {
    const topic = "news.get-list.query";
    class Request {
        category?: string;
        search?: string;
    }
    class Response {
        news: any[];
    }
}
