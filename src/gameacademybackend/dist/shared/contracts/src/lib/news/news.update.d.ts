import { NewsUpdateDto } from "./dtos/news.update.dto";
export declare namespace NewsUpdate {
    const topic = "news.update.command";
    class Request extends NewsUpdateDto {
    }
    class Response {
        success: boolean;
    }
}
