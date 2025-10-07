import { SuccessStoryCreateDto } from "./dtos/success-story.create.dto";
export declare namespace SuccessStoryCreate {
    const topic = "success-story.create.command";
    class Request extends SuccessStoryCreateDto {
    }
    class Response {
        id: string;
    }
}
