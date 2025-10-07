import { NewsAuthorDto } from './news.author.dto';
export declare class NewsCreateDto {
    slug: string;
    title: string;
    category: string;
    image: string;
    date: string;
    markdown: string;
    author?: NewsAuthorDto;
}
