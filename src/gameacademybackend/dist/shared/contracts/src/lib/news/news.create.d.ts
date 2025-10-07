import { NewsCreateDto } from "./dtos/news.create.dto";
export declare namespace NewsCreate {
    const topic = "news.create.command";
    class Request extends NewsCreateDto {
    }
    class Response {
        id: string;
        slug: string;
    }
}
