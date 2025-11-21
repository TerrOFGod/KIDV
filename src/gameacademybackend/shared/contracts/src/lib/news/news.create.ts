import { NewsCreateDto } from './dtos/news.create.dto';

export namespace NewsCreate {
  export const topic = 'news.create.command';
  export class Request extends NewsCreateDto {}
  export class Response {
    id: string;
    slug: string;
  }
}
