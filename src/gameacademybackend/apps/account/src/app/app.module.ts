import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';
import { getRMQConfig } from '@shared/configs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
    RMQModule.forRootAsync(getRMQConfig('auth')),
    UserModule,
    AuthModule,
    MongooseModule.forRootAsync(getMongoConfig()),
  ],
})
export class AppModule {}
