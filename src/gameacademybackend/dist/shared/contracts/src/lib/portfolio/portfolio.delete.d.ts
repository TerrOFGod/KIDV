export declare namespace PortfolioDelete {
    const topic = "portfolio.delete.command";
    class Request {
        id: string;
    }
    class Response {
        success: boolean;
    }
}
