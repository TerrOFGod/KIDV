// libs/contracts/src/health.check.ts
export namespace HealthCheck {
  export const topic = 'health.check';

  export class Request {
    service: string;
  }

  export class Response {
    status: 'ok' | 'error';
    service: string;
    timestamp: string;
    details?: any;
  }
}
