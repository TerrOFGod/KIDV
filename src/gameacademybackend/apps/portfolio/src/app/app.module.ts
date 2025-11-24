import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { getMongoConfig } from './configs/mongo.config';
import { getRMQConfig } from '@shared/configs';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.portfolio.env' }),
    RMQModule.forRootAsync(getRMQConfig('portfolio')),
    MongooseModule.forRootAsync(getMongoConfig()),
    PortfolioModule,
  ],
})
export class AppModule {}
