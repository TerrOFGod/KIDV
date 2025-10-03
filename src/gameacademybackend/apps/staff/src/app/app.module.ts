import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { getMongoConfig } from './configs/mongo.config';
import { getRMQConfig } from './configs/rmq.config';
import { StaffService } from './staff/staff.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.portfolio.env' }),
    RMQModule.forRootAsync(getRMQConfig()),
    StaffService,
    MongooseModule.forRootAsync(getMongoConfig()),]
})
export class AppModule {}
