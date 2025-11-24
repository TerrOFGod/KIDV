import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { getMongoConfig } from './configs/mongo.config';
import { getRMQConfig } from '@shared/configs';
import { SuccessStoryModule } from './success-story/success-story.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.success-story.env' }),
    RMQModule.forRootAsync(getRMQConfig('success')),
    MongooseModule.forRootAsync(getMongoConfig()),
    SuccessStoryModule,
  ],
})
export class AppModule {}
