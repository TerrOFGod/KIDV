export declare namespace PortfolioGetList {
    const topic = "portfolio.get-list.query";
    class Request {
        category?: string;
        hallOfFrame?: boolean;
    }
    class Response {
        portfolio: any[];
    }
}
