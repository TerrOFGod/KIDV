import { ProjectAuthorDto } from './project-author.dto';
import { ProjectPhaseDto } from './project-phase.dto';
export declare class PortfolioCreateDto {
    slug: string;
    title: string;
    category: string;
    image: string;
    description?: string;
    releaseDate?: string;
    download?: string;
    phases?: ProjectPhaseDto[];
    goals?: string[];
    features?: string[];
    screenshots?: string[];
    hallOfFrame?: boolean;
    authors?: ProjectAuthorDto[];
    year?: number;
    markdown?: string;
}
