/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

export const setupGracefulShutdown = (app: any) => {
  const logger = new Logger('GracefulShutdown');

  process.on('SIGTERM', async () => {
    logger.log('Received SIGTERM. Starting graceful shutdown...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.log('Received SIGINT. Starting graceful shutdown...');
    await app.close();
    process.exit(0);
  });
};

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // Добавьте обработку необработанных исключений
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`, error.stack);
  });
  const port = process.env.PORT || 3004;
  setupGracefulShutdown(app);
  await app.listen(port);
  logger.log(`🚀 Application News is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
