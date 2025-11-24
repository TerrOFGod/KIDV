import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

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
  app.enableCors();
  // Добавьте обработку необработанных исключений
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`, error.stack);
  });

  setupGracefulShutdown(app);

  await app.listen(3001);
  logger.log('🚀 Application Backend is running on: http://localhost:3001');
}
bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
