"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRMQConfig = void 0;
const getRMQConfig = (serviceName) => ({
    exchangeName: 'kidv_exchange',
    connections: [
        {
            host: 'localhost',
            login: 'admin',
            password: 'admin',
        },
    ],
    queueName: `${serviceName}.main.queue`,
    prefetchCount: 32,
    serviceName: serviceName,
});
exports.getRMQConfig = getRMQConfig;
//# sourceMappingURL=rmq.config.js.map