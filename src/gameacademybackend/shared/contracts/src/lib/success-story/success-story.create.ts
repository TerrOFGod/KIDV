import { SuccessStoryCreateDto } from "./dtos/success-story.create.dto";

export namespace SuccessStoryCreate {
  export const topic = 'success-story.create.command';
  export class Request extends SuccessStoryCreateDto {}
  export class Response {
    id: string;
  }
}
