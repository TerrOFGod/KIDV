import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { NewsModule } from './news/news.module';
import { getRMQConfig } from '@shared/configs';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.news.env' }),
    RMQModule.forRootAsync(getRMQConfig('news')),
    MongooseModule.forRootAsync(getMongoConfig()),
    NewsModule,
  ],
})
export class AppModule {}
