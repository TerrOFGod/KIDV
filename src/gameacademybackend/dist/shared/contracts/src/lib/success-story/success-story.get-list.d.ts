export declare namespace SuccessStoryGetList {
    const topic = "success-story.get-list.query";
    class Request {
        year?: number;
        city?: string;
    }
    class Response {
        stories: any[];
    }
}
