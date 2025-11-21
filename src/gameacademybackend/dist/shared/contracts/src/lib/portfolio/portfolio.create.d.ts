import { PortfolioCreateDto } from './dtos/portfolio.create.dto';
export declare namespace PortfolioCreate {
    const topic = "portfolio.create.command";
    class Request extends PortfolioCreateDto {
    }
    class Response {
        id: string;
        slug: string;
    }
}
