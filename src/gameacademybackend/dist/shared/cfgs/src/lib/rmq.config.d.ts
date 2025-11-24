export declare const getRMQConfig: (serviceName: string) => {
    exchangeName: string;
    connections: {
        host: string;
        login: string;
        password: string;
    }[];
    queueName: string;
    prefetchCount: number;
    serviceName: string;
};
