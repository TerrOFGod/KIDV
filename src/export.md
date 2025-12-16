## gameacademybackend/apps/account/src/app/auth/others/account.constants.ts

```ts
export const THIS_USER_IS_EXISTS = 'Такой пользователь уже зарегистрирован';
export const THIS_USER_IS_NOT_EXISTS = 'Такого пользователя не существует';
export const WRONG_LOGIN_OR_PASSWORD = 'Неверный логин или пароль';
export const WRONG_OLD_PASSWORD = 'Неверный пароль';
```

## gameacademybackend/apps/account/src/app/auth/auth.controller.ts

```ts
import { Body, Controller } from '@nestjs/common';
import { AccountLogin, AccountRegister, HealthCheck } from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @RMQValidate()
  @RMQRoute(AccountRegister.topic)
  async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    return this.authService.register(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return this.authService.login(id.toString());
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'auth') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'auth',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'auth',
        timestamp: new Date().toISOString(),
        details: {
          database: 'connected',
          memory: process.memoryUsage(),
          uptime: process.uptime(),
        },
      };
    } catch (error) {
      if (error instanceof Error)
        return {
          status: 'error',
          service: 'auth',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
```

## gameacademybackend/apps/account/src/app/auth/auth.module.ts

```ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```

## gameacademybackend/apps/account/src/app/auth/auth.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRegister } from '@shared/contracts';
import { UserRole } from '@shared/interfaces';
import { Types } from 'mongoose';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repos/user.repository';
import { THIS_USER_IS_EXISTS, WRONG_LOGIN_OR_PASSWORD } from './others/account.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password, displayName }: AccountRegister.Request): Promise<AccountRegister.Response> {
    const oldUser = await this.userRepository.findUser(email);
    if (oldUser) throw new Error(THIS_USER_IS_EXISTS);
    const newUserEntity = await new UserEntity({
      displayName,
      email,
      role: UserRole.Admin,
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(newUserEntity);
    return { email: newUser.email };
  }

  async validateUser(email: string, password: string): Promise<{ id: Types.ObjectId }> {
    const user = await this.userRepository.findUser(email);
    if (!user) throw new Error(WRONG_LOGIN_OR_PASSWORD);
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) throw new Error(WRONG_LOGIN_OR_PASSWORD);
    return { id: user._id };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
```

## gameacademybackend/apps/account/src/app/configs/jwt.config.ts

```ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const getJwtConfig = (): JwtModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: '4h',
    },
  }),
});
```

## gameacademybackend/apps/account/src/app/configs/mongo.config.ts

```ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: getMongoString(configService),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
};

const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/' +
  configService.get('MONGO_DATABASE') +
  '?authSource=' +
  configService.get('MONGO_AUTHDATABASE');
```

## gameacademybackend/apps/account/src/app/configs/rmq.config.ts

```ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    connections: [
      {
        login: configService.get('AMQP_LOGIN_USER') ?? '',
        password: configService.get('AMQP_PASSWORD_USER') ?? '',
        host: configService.get('AMQP_HOSTNAME') ?? '',
      },
    ],
    queueName: configService.get('AMQP_QUEUE') ?? '',
    prefetchCount: 32,
    serviceName: 'account-ms',
  }),
});
```

## gameacademybackend/apps/account/src/app/user/entities/user.entity.ts

```ts
import { IUser, UserRole } from '@shared/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';

export class UserEntity implements IUser {
  _id?: Types.ObjectId;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: Omit<IUser, 'passwordHash'>);
  constructor(user: IUser);

  constructor(user: IUser | Omit<IUser, 'passwordHash'>) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;

    if ('passwordHash' in user) {
      this.passwordHash = user.passwordHash;
    }
  }

  public getPublicProfile() {
    return {
      displayName: this.displayName,
      email: this.email,
      role: this.role,
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
}
```

## gameacademybackend/apps/account/src/app/user/models/user.model.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser, UserRole } from '@shared/interfaces';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    enum: UserRole,
    type: String,
    default: UserRole.Guest,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

## gameacademybackend/apps/account/src/app/user/repos/user.repository.ts

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user.model';
import { IUser } from '@shared/interfaces';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findAllUsers(): Promise<IUser[]> {
    return this.userModel.find().select('email displayName role').lean().exec();
  }

  async updateUserByEmail(email: string, partialEntity: Partial<UserEntity>) {
    return this.userModel.findOneAndUpdate({ email }, partialEntity, {
      new: true,
    });
  }

  async updateUserById({ _id, ...rest }: UserEntity) {
    return this.userModel.updateOne({ _id }, { $set: { ...rest } }).exec();
  }

  async deleteUser(email: string) {
    return this.userModel.deleteOne({ email }).exec();
  }

  async searchByDisplayName(searchTerm?: string): Promise<IUser[]> {
    const regex = searchTerm?.trim() ? new RegExp(searchTerm.trim(), 'i') : null;
    const filter = regex ? { displayName: regex } : {};
    return this.userModel.find(filter).select('_id email displayName role').lean().exec();
  }
}
```

## gameacademybackend/apps/account/src/app/user/user.commands.ts

```ts
import { Body, Controller } from '@nestjs/common';
import { AccountChangePasswordProfile, AccountChangeProfile, AccountChangeRole, HealthCheck } from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { THIS_USER_IS_NOT_EXISTS, WRONG_OLD_PASSWORD } from '../auth/others/account.constants';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repos/user.repository';
import { AccountDeleteUser } from '@shared/contracts';

@Controller()
export class UserCommands {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async userInfo(@Body() { user, id }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) throw new Error(THIS_USER_IS_NOT_EXISTS);
    const userEntity = new UserEntity(existedUser).updateProfile(user.displayName);
    await this.userRepository.updateUserById(userEntity);
    return { user };
  }

  @RMQValidate()
  @RMQRoute(AccountChangeRole.topic)
  async changeRole(@Body() dto: AccountChangeRole.Request): Promise<AccountChangeRole.Response> {
    const user = await this.userRepository.findUser(dto.email);
    if (!user) throw new Error('Пользователь не найден');

    const userEntity = new UserEntity(user);
    userEntity.role = dto.newRole;
    await this.userRepository.updateUserById(userEntity);
    return { profile: userEntity.getPublicProfile() };
  }

  @RMQValidate()
  @RMQRoute(AccountDeleteUser.topic)
  async deleteUser(@Body() { email }: AccountDeleteUser.Request): Promise<AccountDeleteUser.Response> {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    await this.userRepository.deleteUser(email);
    return { success: true };
  }

  @RMQValidate()
  @RMQRoute(AccountChangePasswordProfile.topic)
  async changePassword(
    @Body() { id, passwords }: AccountChangePasswordProfile.Request,
  ): Promise<AccountChangePasswordProfile.Response> {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) throw new Error(THIS_USER_IS_NOT_EXISTS);

    const userEntity = new UserEntity(existedUser);
    const isOldValid = await userEntity.validatePassword(passwords.oldPassword);
    if (!isOldValid) throw new Error(WRONG_OLD_PASSWORD);

    await userEntity.setPassword(passwords.newPassword);

    await this.userRepository.updateUserById(userEntity);

    return { success: true };
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'user') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'user',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'user',
        timestamp: new Date().toISOString(),
        details: {
          database: 'connected',
          memory: process.memoryUsage(),
          uptime: process.uptime(),
        },
      };
    } catch (error) {
      if (error instanceof Error)
        return {
          status: 'error',
          service: 'user',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
```

## gameacademybackend/apps/account/src/app/user/user.module.ts

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './repos/user.repository';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.quries';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserRepository],
  exports: [UserRepository],
  controllers: [UserCommands, UserQueries],
})
export class UserModule {
  name: string;
}
```

## gameacademybackend/apps/account/src/app/user/user.quries.ts

```ts
import { Body, Controller } from '@nestjs/common';
import { AccountUserInfo, UserList, UserSearch } from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repos/user.repository';

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(@Body() { id }: AccountUserInfo.Request): Promise<AccountUserInfo.Response> {
    const user = await this.userRepository.findUserById(id);
    const profile = new UserEntity(user).getPublicProfile();
    return { profile };
  }

  @RMQValidate()
  @RMQRoute(UserSearch.topic)
  async searchUsers(@Body() dto: UserSearch.Request): Promise<UserSearch.Response> {
    const found = await this.userRepository.searchByDisplayName(dto.query);
    return {
      users: found.map((u) => ({
        _id: u._id.toString(),
        email: u.email,
        displayName: u.displayName,
        role: u.role,
      })),
    };
  }

  @RMQRoute(UserList.topic)
  async listUsers(): Promise<UserList.Response> {
    const users = await this.userRepository.findAllUsers();
    return {
      users: users.map((u) => ({
        email: u.email,
        displayName: u.displayName,
        role: u.role,
      })),
    };
  }
}
```

## gameacademybackend/apps/account/src/app/app.module.ts

```ts
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
```

## gameacademybackend/apps/account/src/main.ts

```ts
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
  app.enableCors();

  // Добавьте обработку необработанных исключений
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`, error.stack);
  });

  const port = process.env.PORT || 3002;
  setupGracefulShutdown(app);
  await app.listen(port);
  logger.log(`🚀 Application Account is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
```

## gameacademybackend/envs/.account.env

```env
# Должен быть идентичен .api.env
JWT_SECRET=dev_station

MONGO_LOGIN=admin
MONGO_PASSWORD=admin
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=academy
MONGO_AUTHDATABASE=admin

AMQP_EXCHANGE=accounts.topic.exchange
AMQP_LOGIN_USER=admin
AMQP_PASSWORD_USER=admin
AMQP_QUEUE=accounts.main.queue
AMQP_HOSTNAME=localhost
```

## gameacademybackend/shared/configs/src/lib/rmq.config.ts

```ts
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
```

## gameacademybackend/shared/configs/src/index.ts

```ts
export * from './lib/rmq.config';
```

## gameacademybackend/shared/contracts/src/lib/account/account.change-password-profile.ts

```ts
import { IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ChangePasswordDto {
  @IsString()
  @MinLength(6, { message: 'Старый пароль должен содержать минимум 6 символов' })
  oldPassword: string;

  @IsString()
  @MinLength(6, { message: 'Новый пароль должен содержать минимум 6 символов' })
  newPassword: string;
}

export namespace AccountChangePasswordProfile {
  export const topic = 'account.change-password-profile.command';

  export class Request {
    @IsString()
    id: string;

    @Type(() => ChangePasswordDto)
    @ValidateNested()
    passwords: ChangePasswordDto;
  }

  export class Response {
    success: boolean;
  }
}
```

## gameacademybackend/shared/contracts/src/lib/account/account.change-profile.ts

```ts
import { Type } from 'class-transformer';
import { ValidateNested, IsString } from 'class-validator';

class ChangeProfileDto {
  @IsString()
  displayName: string;
}

export namespace AccountChangeProfile {
  export const topic = 'account.change-profile.command';

  export class Request {
    @IsString()
    id: string;

    @ValidateNested()
    @Type(() => ChangeProfileDto)
    user: ChangeProfileDto;
  }

  export class Response {}
}
```

## gameacademybackend/shared/contracts/src/lib/account/account.change-role.ts

```ts
import { IUser, UserRole } from '@shared/interfaces';
import { IsEnum, IsString } from 'class-validator';

export namespace AccountChangeRole {
  export const topic = 'account.change-role.command';

  export class Request {
    @IsString()
    email: string;

    @IsEnum(UserRole)
    newRole: UserRole;
  }

  export class Response {
    profile: Omit<IUser, 'passwordHash'>;
  }
}
```

## gameacademybackend/shared/contracts/src/lib/account/account.delete-user.ts

```ts
import { IsEmail } from 'class-validator';

export namespace AccountDeleteUser {
  export const topic = 'account.delete-user.command';

  export class Request {
    @IsEmail()
    email: string;
  }

  export class Response {
    success: boolean;
  }
}
```

## gameacademybackend/shared/contracts/src/lib/account/account.login.ts

```ts
import { IsEmail, IsString } from 'class-validator';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }

  export class Response {
    access_token: string;
  }
}
```

## gameacademybackend/shared/contracts/src/lib/account/account.register.ts

```ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    displayName?: string;
  }

  export class Response {
    email: string;
  }
}
```

## gameacademybackend/shared/contracts/src/lib/account/account.user-info.ts

```ts
import { IUser } from '@shared/interfaces';
import { IsString } from 'class-validator';

export namespace AccountUserInfo {
  export const topic = 'account.user-info.query';

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    profile: Omit<IUser, 'passwordHash'>;
  }
}
```

## gameacademybackend/shared/contracts/src/lib/account/account.user-list.ts

```ts
export namespace UserList {
  export const topic = 'users.list';
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export type Request = {};
  export type Response = { users: { email: string; displayName: string; role: string }[] };
}
```

## gameacademybackend/shared/contracts/src/lib/account/account.user-search.ts

```ts
import { IsOptional, IsString } from 'class-validator';

export namespace UserSearch {
  export const topic = 'users.search.query';

  export class Request {
    @IsOptional()
    @IsString()
    query?: string;
  }

  export class Response {
    users: Array<{
      _id: string;
      email: string;
      displayName?: string;
      role: string;
    }>;
  }
}
```

## gameacademybackend/shared/contracts/src/index.ts

```ts
export * from './lib/account/account.change-profile';
export * from './lib/account/account.change-role';
export * from './lib/account/account.login';
export * from './lib/account/account.register';
export * from './lib/account/account.user-info';
export * from './lib/account/account.user-list';
export * from './lib/account/account.delete-user';
export * from './lib/account/account.user-search';
export * from './lib/account/account.change-password-profile';
export * from './lib/project/game.create';
export * from './lib/project/game.get-all';
export * from './lib/project/comment.create';
export * from './lib/project/comment.list';
export * from './lib/news/news.create';
export * from './lib/news/news.delete';
export * from './lib/news/news.get-by-id';
export * from './lib/news/news.get-by-slug';
export * from './lib/news/news.get-list';
export * from './lib/news/news.update';
export * from './lib/portfolio/portfolio.create';
export * from './lib/portfolio/portfolio.delete';
export * from './lib/portfolio/portfolio.get-by-slug';
export * from './lib/portfolio/portfolio.get-list';
export * from './lib/portfolio/portfolio.update';
export * from './lib/staff/staff.create';
export * from './lib/staff/staff.delete';
export * from './lib/staff/staff.get-list';
export * from './lib/staff/staff.update';
export * from './lib/success-story/success-story.create';
export * from './lib/success-story/success-story.delete';
export * from './lib/success-story/success-story.get-list';
export * from './lib/success-story/success-story.update';
export * from './lib/health/health.check';
```

## gameacademybackend/shared/interfaces/src/lib/auth.interface.ts

```ts
export interface IJWTPayload {
  id: string;
}
```

## gameacademybackend/shared/interfaces/src/lib/user.interface.ts

```ts
import { Types } from 'mongoose';

export enum UserRole {
  Guest = 'Guest',
  Teacher = 'Teacher',
  Student = 'Student',
  Admin = 'Admin',
}

export interface IUser {
  _id?: Types.ObjectId;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
```

## gameacademybackend/shared/interfaces/src/index.ts

```ts
export * from './lib/auth.interface';
export * from './lib/user.interface';
export * from './lib/news.interface';
export * from './lib/portfolio.interface';
export * from './lib/staff.interface';
export * from './lib/success-story.interface';
```

