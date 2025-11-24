import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRMQConfig = (serviceName: string): IRMQServiceAsyncOptions => ({
  useFactory: () => ({
    exchangeName: 'kidv_exchange',
    connections: [
      {
        host: 'localhost',
        port: 5672,
        login: 'admin',
        password: 'admin',
      },
    ],
    queueName: `${serviceName}.main.queue`,
    prefetchCount: 10,
    serviceName: serviceName,
    queueOptions: {
      durable: true,
      arguments: {
        'x-queue-type': 'classic', // Явно указываем тип очереди
      },
    },
    // Добавьте эти настройки
    reconnectTimeInSeconds: 5,
    heartbeatIntervalInSeconds: 30,
    messagesTimeout: 30000,
    isGlobalPrefetchCount: false,
    manualAck: false,
  }),
  inject: [],
});
