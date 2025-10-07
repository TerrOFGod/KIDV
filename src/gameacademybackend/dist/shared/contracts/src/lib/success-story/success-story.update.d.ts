import { SuccessStoryCreateDto } from './dtos/success-story.create.dto';
export declare namespace SuccessStoryUpdate {
    const topic = "success-story.update.command";
    class Request extends SuccessStoryCreateDto {
        id: string;
    }
    class Response {
        success: boolean;
    }
}
