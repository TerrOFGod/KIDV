export declare namespace HealthCheck {
    const topic = "health.check";
    class Request {
        service: string;
    }
    class Response {
        status: 'ok' | 'error';
        service: string;
        timestamp: string;
        details?: any;
    }
}
