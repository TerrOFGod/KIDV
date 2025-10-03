import { NewsUpdateDto } from "./dtos/news.update.dto";

export namespace NewsUpdate {
  export const topic = 'news.update.command';
  export class Request extends NewsUpdateDto {}
  export class Response {
    success: boolean;
  }
}