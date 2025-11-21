import { NewsAuthorDto } from './news.author.dto';
export declare class NewsCreateDto {
    slug: string;
    title: string;
    category: string;
    image?: string;
    date: string;
    markdown?: string;
    excerpt?: string;
    content?: string;
    readTime?: string;
    author?: NewsAuthorDto;
    tags?: string[];
}
