import { PortfolioCreateDto } from './dtos/portfolio.create.dto';
export declare namespace PortfolioUpdate {
    const topic = "portfolio.update.command";
    class Request extends PortfolioCreateDto {
        id: string;
    }
    class Response {
        success: boolean;
    }
}
