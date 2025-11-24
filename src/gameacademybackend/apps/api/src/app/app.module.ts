import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJwtConfig } from './configs/jwt.config';
import { getRMQConfig } from '@shared/configs';
import { AuthContoller as AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CommentsController } from './controllers/comments.controller';
import { NewsController } from './controllers/news.controller';
import { PortfolioController } from './controllers/portfolio.controller';
import { StaffController } from './controllers/staff.controller';
import { SuccessStoryController } from './controllers/success-story.controller';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RMQModule.forRootAsync(getRMQConfig('gateway')),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
  ],
  controllers: [
    AuthController,
    UserController,
    CommentsController,
    NewsController,
    PortfolioController,
    StaffController,
    SuccessStoryController,
    HealthController,
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AppModule {}
