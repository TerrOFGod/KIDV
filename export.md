# Project Structure

```
gameacademybackend/
  apps/
    .github/
      instructions/
        nx.instructions.md
    account/
      src/
        app/
          auth/
            others/
              account.constants.ts
            auth.controller.ts
            auth.module.ts
            auth.service.ts
          configs/
            jwt.config.ts
            mongo.config.ts
            rmq.config.ts
          user/
            entities/
              user.entity.ts
            models/
              user.model.ts
            repos/
              user.repository.ts
            user.commands.ts
            user.module.ts
            user.quries.ts
          app.module.ts
        assets/
          .gitkeep
        main.ts
      eslint.config.mjs
      jest.config.ts
      project.json
      tsconfig.app.json
      tsconfig.json
      tsconfig.spec.json
      webpack.config.js
    api/
      src/
        app/
          configs/
            jwt.config.ts
            rmq.config.ts
          controllers/
            auth.controller.ts
            comments.controller.ts
            health.controller.ts
            news.controller.ts
            portfolio.controller.ts
            staff.controller.ts
            success-story.controller.ts
            user.controller.ts
          dtos/
            login.dto.ts
            register.dto.ts
          guards/
            jwt.guard.ts
            roles.guard.ts
            user.decorator.ts
          strategies/
            jwt.strategy.ts
          app.module.ts
        assets/
          .gitkeep
        main.ts
      eslint.config.mjs
      jest.config.ts
      project.json
      tsconfig.app.json
      tsconfig.json
      tsconfig.spec.json
      webpack.config.js
    duplicate-checker/
      app/
        api.py
        models.py
        utils.py
      main.py
      requirements.txt
    file/
      src/
        app/
          app.controller.ts
          app.module.ts
          app.service.ts
        assets/
          .gitkeep
        main.ts
      project.json
      tsconfig.app.json
      tsconfig.json
      webpack.config.js
    news/
      src/
        app/
          configs/
            mongo.config.ts
            rmq.config.ts
          news/
            entities/
              news.entity.ts
            models/
              news.model.ts
            repos/
              news.repository.ts
            news.commands.ts
            news.module.ts
            news.service.ts
          app.module.ts
        assets/
          .gitkeep
        main.ts
      eslint.config.mjs
      jest.config.ts
      project.json
      tsconfig.app.json
      tsconfig.json
      tsconfig.spec.json
      webpack.config.js
    portfolio/
      src/
        app/
          configs/
            mongo.config.ts
            rmq.config.ts
          portfolio/
            entities/
              portfolio.entity.ts
            models/
              portfolio.model.ts
            repos/
              portfolio.repository.ts
            portfolio.commands.ts
            portfolio.module.ts
            portfolio.queries.ts
            portfolio.service.ts
          app.module.ts
        assets/
          .gitkeep
        main.ts
      eslint.config.mjs
      project.json
      tsconfig.app.json
      tsconfig.json
      webpack.config.js
    projects/
      src/
        admin/
          admin-duplicates.controller.ts
          admin-games.controller.ts
          admin.module.ts
        assets/
          .gitkeep
        comments/
          dtos/
            create-comment.dto.ts
          models/
            user.model.ts
          schemas/
            comment.schema.ts
            user.schema.ts
          comments.controller.ts
          comments.module.ts
          comments.service.ts
          jwt.guard.ts
        configs/
          jwt.config.ts
          minio.config.ts
          mongo.config.ts
          rmq.config.ts
        duplicate/
          schemas/
            duplicate.schema.ts
          duplicate.controller.ts
          duplicate.module.ts
          duplicate.service.ts
        games/
          dto/
            create-game.dto.ts
          schemas/
            game.schema.ts
          games.controller.ts
          games.module.ts
          games.service.ts
        minio/
          minio.module.ts
          minio.service.ts
        app.controller.ts
        app.module.ts
        app.service.ts
        main.ts
      eslint.config.mjs
      jest.config.ts
      project.json
      tsconfig.app.json
      tsconfig.json
      tsconfig.spec.json
      webpack.config.js
    staff/
      src/
        app/
          configs/
            mongo.config.ts
            rmq.config.ts
          staff/
            entities/
              staff.entity.ts
            models/
              staff.model.ts
            repos/
              staff.repository.ts
            staff.commands.ts
            staff.module.ts
            staff.queries.ts
            staff.service.ts
          app.module.ts
        assets/
          .gitkeep
        main.ts
      eslint.config.mjs
      project.json
      tsconfig.app.json
      tsconfig.json
      webpack.config.js
    success-story/
      src/
        app/
          configs/
            mongo.config.ts
            rmq.config.ts
          success-story/
            entities/
              success-story.entity.ts
            models/
              success-story.model.ts
            repos/
              success-story.repository.ts
            success-story.commands.ts
            success-story.module.ts
            success-story.queries.ts
            success-story.service.ts
          app.module.ts
        assets/
          .gitkeep
        main.ts
      eslint.config.mjs
      project.json
      tsconfig.app.json
      tsconfig.json
      webpack.config.js
  envs/
    .account.env
    .api.env
    .news.env
    .portfolio.env
    .projects.env
    .staff.env
    .success-story.env
  shared/
    configs/
      src/
        lib/
          rmq.config.ts
        index.ts
      eslint.config.mjs
      project.json
      README.md
      tsconfig.json
      tsconfig.lib.json
    contracts/
      src/
        lib/
          account/
            account.change-password-profile.ts
            account.change-profile.ts
            account.change-role.ts
            account.delete-user.ts
            account.login.ts
            account.register.ts
            account.user-info.ts
            account.user-list.ts
            account.user-search.ts
          health/
            health.check.ts
          news/
            dtos/
              news.author.dto.ts
              news.create.dto.ts
              news.update.dto.ts
            news.create.ts
            news.delete.ts
            news.get-by-id.ts
            news.get-by-slug.ts
            news.get-list.ts
            news.update.ts
          portfolio/
            dtos/
              portfolio.create.dto.ts
              project-author.dto.ts
              project-phase.dto.ts
              project-skill.dto.ts
            portfolio.create.ts
            portfolio.delete.ts
            portfolio.get-by-slug.ts
            portfolio.get-list.ts
            portfolio.update.ts
          project/
            comment.create.ts
            comment.list.ts
            game.create.ts
            game.get-all.ts
          staff/
            dtos/
              staff-achievement.dto.ts
              staff-skill.dto.ts
              staff-stat.dto.ts
              staff.create.dto.ts
              subskill.dto.ts
            types/
              rarity.type.ts
            staff.create.ts
            staff.delete.ts
            staff.get-by-slug.ts
            staff.get-list.ts
            staff.update.ts
          success-story/
            dtos/
              success-story.create.dto.ts
            success-story.create.ts
            success-story.delete.ts
            success-story.get-list.ts
            success-story.update.ts
        index.ts
      eslint.config.mjs
      package.json
      project.json
      README.md
      tsconfig.json
      tsconfig.lib.json
    interfaces/
      src/
        lib/
          auth.interface.ts
          news.interface.ts
          portfolio.interface.ts
          staff.interface.ts
          success-story.interface.ts
          user.interface.ts
        index.ts
      eslint.config.mjs
      package.json
      project.json
      README.md
      tsconfig.json
      tsconfig.lib.json
  .editorconfig
  .prettierignore
  .prettierrc
  eslint.config.mjs
  jest.config.ts
  jest.preset.js
  migrations.json
  nx.json
  package-lock.json
  package.json
  project.json
  README.md
  tsconfig.base.json
```



# Selected Files Content

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

## gameacademybackend/apps/api/src/app/configs/jwt.config.ts

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

## gameacademybackend/apps/api/src/app/configs/rmq.config.ts

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
    queueName: configService.get('AMQP_QUEUE'),
    prefetchCount: 32,
    serviceName: 'api-ms',
  }),
});
```

## gameacademybackend/apps/api/src/app/controllers/auth.controller.ts

```ts
import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@shared/contracts';
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthContoller {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService.send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, dto);
    } catch (e) {
      if (e instanceof Error) throw new UnauthorizedException(e.message);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) throw new UnauthorizedException(e.message);
    }
  }

  // В gateway для проверки всех сервисов
  @Get('health')
  async health() {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'news'];
    const results = [];

    for (const service of services) {
      try {
        const result = await this.rmqService.send(`${service}.health.check`, {});
        results.push({ service, status: 'ok', data: result });
      } catch (e) {
        if (e instanceof Error) results.push({ service, status: 'error', error: e.message });
      }
    }

    return results;
  }
}
```

## gameacademybackend/apps/api/src/app/controllers/comments.controller.ts

```ts
import { Controller, Post, Get, Body, Query, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { CommentCreate, CommentList } from '@shared/contracts';
import type { Request } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly rmq: RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  async create(@Body() dto: CommentCreate.Request, @Req() req: Request): Promise<CommentCreate.Response> {
    const userId = req.user as string;

    if (!dto.content.trim()) {
      throw new UnauthorizedException('Пустой комментарий');
    }

    return this.rmq.send<CommentCreate.Request, CommentCreate.Response>(CommentCreate.topic, { ...dto, userId });
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  async list(@Query('gameId') gameId: string): Promise<CommentList.Response> {
    return this.rmq.send<CommentList.Request, CommentList.Response>(CommentList.topic, { gameId });
  }
}
```

## gameacademybackend/apps/api/src/app/controllers/health.controller.ts

```ts
// gateway/health.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { HealthCheck } from '@shared/contracts';

interface HealthResult {
  service: string;
  status: 'ok' | 'error';
  response?: HealthCheck.Response;
  error?: string;
  responseTime?: number;
}

@Controller('health')
export class HealthController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async checkAll(): Promise<{ results: HealthResult[]; timestamp: string }> {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'success']; // Список ваших сервисов
    const results: HealthResult[] = [];

    for (const service of services) {
      const startTime = Date.now();

      try {
        const response = await this.rmqService.send<HealthCheck.Request, HealthCheck.Response>(
          HealthCheck.topic,
          { service },
          { timeout: 5000 }, // Таймаут 5 секунд на каждый сервис
        );

        results.push({
          service,
          status: response.status,
          response,
          responseTime: Date.now() - startTime,
        });
      } catch (error) {
        if (error instanceof Error)
          results.push({
            service,
            status: 'error',
            error: error.message,
            responseTime: Date.now() - startTime,
          });
      }
    }

    return {
      results,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':service')
  async checkService(@Param('service') service: string): Promise<HealthResult> {
    const startTime = Date.now();

    try {
      const response = await this.rmqService.send<HealthCheck.Request, HealthCheck.Response>(HealthCheck.topic, {
        service,
      });

      return {
        service,
        status: response.status,
        response,
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      if (error instanceof Error)
        return {
          service,
          status: 'error',
          error: error.message,
          responseTime: Date.now() - startTime,
        };
    }
  }
}
```

## gameacademybackend/apps/api/src/app/controllers/news.controller.ts

```ts
import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { NewsCreate, NewsUpdate, NewsDelete, NewsGetBySlug, NewsGetList } from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('news')
export class NewsController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async getNewsList(@Query('category') category?: string, @Query('search') search?: string) {
    return this.rmqService.send<NewsGetList.Request, NewsGetList.Response>(NewsGetList.topic, { category, search });
  }

  @Get(':slug')
  async getNewsBySlug(@Param('slug') slug: string) {
    return this.rmqService.send<NewsGetBySlug.Request, NewsGetBySlug.Response>(NewsGetBySlug.topic, { slug });
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async createNews(@Body() dto: NewsCreate.Request) {
    return this.rmqService.send<NewsCreate.Request, NewsCreate.Response>(NewsCreate.topic, dto);
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async updateNews(@Param('id') id: string, @Body() dto: NewsCreate.Request) {
    return this.rmqService.send<NewsUpdate.Request, NewsUpdate.Response>(NewsUpdate.topic, { ...dto, id });
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async deleteNews(@Param('id') id: string) {
    return this.rmqService.send<NewsDelete.Request, NewsDelete.Response>(NewsDelete.topic, { id });
  }

  @Get('health')
  async health() {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'success'];
    const results = [];

    for (const service of services) {
      try {
        const result = await this.rmqService.send(`${service}.health.check`, {});
        results.push({ service, status: 'ok', data: result });
      } catch (e) {
        if (e instanceof Error) results.push({ service, status: 'error', error: e.message });
      }
    }

    return results;
  }
}
```

## gameacademybackend/apps/api/src/app/controllers/portfolio.controller.ts

```ts
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import {
  PortfolioCreate,
  PortfolioUpdate,
  PortfolioDelete,
  PortfolioGetBySlug,
  PortfolioGetList,
} from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async getPortfolioList(@Query('category') category?: string, @Query('hallOfFrame') hallOfFrame?: boolean) {
    return this.rmqService.send<PortfolioGetList.Request, PortfolioGetList.Response>(PortfolioGetList.topic, {
      category,
      hallOfFrame,
    });
  }

  @Get(':slug')
  async getPortfolioBySlug(@Param('slug') slug: string) {
    return this.rmqService.send<PortfolioGetBySlug.Request, PortfolioGetBySlug.Response>(PortfolioGetBySlug.topic, {
      slug,
    });
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async createPortfolio(@Body() dto: PortfolioCreate.Request) {
    return this.rmqService.send<PortfolioCreate.Request, PortfolioCreate.Response>(PortfolioCreate.topic, dto);
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async updatePortfolio(@Param('id') id: string, @Body() dto: PortfolioCreate.Request) {
    return this.rmqService.send<PortfolioUpdate.Request, PortfolioUpdate.Response>(PortfolioUpdate.topic, {
      ...dto,
      id,
    });
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async deletePortfolio(@Param('id') id: string) {
    return this.rmqService.send<PortfolioDelete.Request, PortfolioDelete.Response>(PortfolioDelete.topic, { id });
  }

  @Get('health')
  async health() {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'success'];
    const results = [];

    for (const service of services) {
      try {
        const result = await this.rmqService.send(`${service}.health.check`, {});
        results.push({ service, status: 'ok', data: result });
      } catch (e) {
        if (e instanceof Error) results.push({ service, status: 'error', error: e.message });
      }
    }

    return results;
  }
}
```

## gameacademybackend/apps/api/src/app/controllers/staff.controller.ts

```ts
import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { StaffCreate, StaffUpdate, StaffDelete, StaffGetBySlug, StaffGetList } from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('staff')
export class StaffController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async getStaffList(@Query('position') position?: string, @Query('rarity') rarity?: string) {
    return this.rmqService.send<StaffGetList.Request, StaffGetList.Response>(StaffGetList.topic, { position, rarity });
  }

  @Get(':slug')
  async getStaffBySlug(@Param('slug') slug: string) {
    return this.rmqService.send<StaffGetBySlug.Request, StaffGetBySlug.Response>(StaffGetBySlug.topic, { slug });
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async createStaff(@Body() dto: StaffCreate.Request) {
    return this.rmqService.send<StaffCreate.Request, StaffCreate.Response>(StaffCreate.topic, dto);
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async updateStaff(@Param('id') id: string, @Body() dto: StaffCreate.Request) {
    return this.rmqService.send<StaffUpdate.Request, StaffUpdate.Response>(StaffUpdate.topic, { ...dto, id });
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async deleteStaff(@Param('id') id: string) {
    return this.rmqService.send<StaffDelete.Request, StaffDelete.Response>(StaffDelete.topic, { id });
  }

  @Get('health')
  async health() {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'success'];
    const results = [];

    for (const service of services) {
      try {
        const result = await this.rmqService.send(`${service}.health.check`, {});
        results.push({ service, status: 'ok', data: result });
      } catch (e) {
        if (e instanceof Error) results.push({ service, status: 'error', error: e.message });
      }
    }

    return results;
  }
}
```

## gameacademybackend/apps/api/src/app/controllers/success-story.controller.ts

```ts
import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { SuccessStoryCreate, SuccessStoryUpdate, SuccessStoryDelete, SuccessStoryGetList } from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('success-stories')
export class SuccessStoryController {
  constructor(private readonly rmqService: RMQService) {}

  @Get()
  async getSuccessStories(@Query('year') year?: number, @Query('city') city?: string) {
    return this.rmqService.send<SuccessStoryGetList.Request, SuccessStoryGetList.Response>(SuccessStoryGetList.topic, {
      year: year ? parseInt(year.toString()) : undefined,
      city,
    });
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async createSuccessStory(@Body() dto: SuccessStoryCreate.Request) {
    return this.rmqService.send<SuccessStoryCreate.Request, SuccessStoryCreate.Response>(SuccessStoryCreate.topic, dto);
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async updateSuccessStory(@Param('id') id: string, @Body() dto: SuccessStoryCreate.Request) {
    return this.rmqService.send<SuccessStoryUpdate.Request, SuccessStoryUpdate.Response>(SuccessStoryUpdate.topic, {
      ...dto,
      id,
    });
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @Roles(UserRole.Admin)
  async deleteSuccessStory(@Param('id') id: string) {
    return this.rmqService.send<SuccessStoryDelete.Request, SuccessStoryDelete.Response>(SuccessStoryDelete.topic, {
      id,
    });
  }

  @Get('health')
  async health() {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'success'];
    const results = [];

    for (const service of services) {
      try {
        const result = await this.rmqService.send(`${service}.health.check`, {});
        results.push({ service, status: 'ok', data: result });
      } catch (e) {
        if (e instanceof Error) results.push({ service, status: 'error', error: e.message });
      }
    }

    return results;
  }
}
```

## gameacademybackend/apps/api/src/app/controllers/user.controller.ts

```ts
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import {
  AccountUserInfo,
  AccountChangeRole,
  UserList,
  AccountDeleteUser,
  UserSearch,
  AccountChangePasswordProfile,
} from '@shared/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import { Roles } from '../guards/roles.guard';
import { UserRole } from '@shared/interfaces';

@Controller('user')
export class UserController {
  rmq: any;
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Post('info')
  async info(@UserId() userIdFromToken: string, @Body() { id }: AccountUserInfo.Request) {
    return this.rmqService.send<AccountUserInfo.Request, AccountUserInfo.Response>(AccountUserInfo.topic, { id });
  }

  @UseGuards(JWTAuthGuard)
  @Post('change-role')
  async changeRole(@Body() dto: AccountChangeRole.Request): Promise<AccountChangeRole.Response> {
    return this.rmqService.send<AccountChangeRole.Request, AccountChangeRole.Response>(AccountChangeRole.topic, dto);
  }

  @Get('users')
  @Roles(UserRole.Admin)
  async listUsers(): Promise<UserList.Response> {
    return this.rmqService.send<UserList.Request, UserList.Response>(UserList.topic, {});
  }

  @Post('users/change-role')
  @Roles(UserRole.Admin)
  async changeRoleAdmin(@Body() dto: AccountChangeRole.Request): Promise<AccountChangeRole.Response> {
    return this.rmqService.send<AccountChangeRole.Request, AccountChangeRole.Response>(AccountChangeRole.topic, dto);
  }

  @Post('delete')
  async delete(@Body() dto: AccountDeleteUser.Request): Promise<AccountDeleteUser.Response> {
    return this.rmqService.send<AccountDeleteUser.Request, AccountDeleteUser.Response>(AccountDeleteUser.topic, dto);
  }

  @UseGuards(JWTAuthGuard)
  @Get('search')
  async search(@Query('query') query?: string): Promise<UserSearch.Response> {
    return this.rmqService.send<UserSearch.Request, UserSearch.Response>(UserSearch.topic, { query });
  }

  @UseGuards(JWTAuthGuard)
  @Post('change-password')
  async changePassword(
    @UserId() userIdFromToken: string,
    @Body() body: { oldPassword: string; newPassword: string },
  ): Promise<AccountChangePasswordProfile.Response> {
    const { oldPassword, newPassword } = body;
    return this.rmqService.send<AccountChangePasswordProfile.Request, AccountChangePasswordProfile.Response>(
      AccountChangePasswordProfile.topic,
      {
        id: userIdFromToken,
        passwords: { oldPassword, newPassword },
      },
    );
  }

  @Get('health')
  async health() {
    const services = ['auth', 'user', 'news', 'portfolio', 'staff', 'success'];
    const results = [];

    for (const service of services) {
      try {
        const result = await this.rmqService.send(`${service}.health.check`, {});
        results.push({ service, status: 'ok', data: result });
      } catch (e) {
        if (e instanceof Error) results.push({ service, status: 'error', error: e.message });
      }
    }

    return results;
  }
}
```

## gameacademybackend/apps/api/src/app/dtos/login.dto.ts

```ts
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
```

## gameacademybackend/apps/api/src/app/dtos/register.dto.ts

```ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  displayName?: string;
}
```

## gameacademybackend/apps/api/src/app/guards/jwt.guard.ts

```ts
import { AuthGuard } from '@nestjs/passport';

export class JWTAuthGuard extends AuthGuard('jwt') {}
```

## gameacademybackend/apps/api/src/app/guards/roles.guard.ts

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@shared/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', ctx.getHandler());
    if (!requiredRoles) return true;
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as any;
    return requiredRoles.includes((user as any).role);
  }
}

import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
```

## gameacademybackend/apps/api/src/app/guards/user.decorator.ts

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  if (typeof user === 'string') {
    return user;
  }

  if (user && typeof user === 'object') {
    if (typeof user.sub === 'string') {
      return user.sub;
    }
    if (typeof user.id === 'string') {
      return user.id;
    }
  }

  throw new Error('Cannot extract userId from request');
});
```

## gameacademybackend/apps/api/src/app/strategies/jwt.strategy.ts

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export type JwtPayload = { sub: string; email: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string; role: string }) {
    return payload;
  }
}
```

## gameacademybackend/apps/api/src/app/app.module.ts

```ts
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
```

## gameacademybackend/apps/api/src/main.ts

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
  // Добавьте обработку необработанных исключений
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`, error.stack);
  });
  const port = process.env.PORT || 3003;
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  setupGracefulShutdown(app);
  await app.listen(port);
  logger.log(`🚀 Application Gateway is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
```

## gameacademybackend/apps/news/src/app/configs/mongo.config.ts

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

## gameacademybackend/apps/news/src/app/configs/rmq.config.ts

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

## gameacademybackend/apps/news/src/app/news/entities/news.entity.ts

```ts
import { INews } from '@shared/interfaces';
import { Types } from 'mongoose';

export class NewsEntity implements INews {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image?: string; // Для локальных и внешних изображений
  date: string;
  markdown?: string;
  excerpt?: string;
  content?: string;
  readTime?: string;
  author?: { name: string; slug: string }; // Опциональный идентификатор автора
  tags?: string[];

  constructor(news: Partial<NewsEntity>) {
    this._id = news._id;
    this.slug = news.slug;
    this.title = news.title;
    this.category = news.category;
    this.image = news.image;
    this.date = news.date;
    this.markdown = news.markdown;
    this.excerpt = news.excerpt;
    this.content = news.content;
    this.readTime = news.readTime;
    this.author = news.author;
    this.tags = news.tags;
  }

  public getPublicInfo() {
    return {
      _id: this._id,
      slug: this.slug,
      title: this.title,
      category: this.category,
      image: this.image,
      date: this.date,
      markdown: this.markdown,
      excerpt: this.excerpt,
      content: this.content,
      readTime: this.readTime,
      author: this.author,
      tags: this.tags,
    };
  }
}
```

## gameacademybackend/apps/news/src/app/news/models/news.model.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsDocument = HydratedDocument<News>;

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  image?: string;

  @Prop({ required: true })
  date: string;

  @Prop()
  markdown?: string;

  @Prop()
  excerpt?: string;

  @Prop()
  content?: string;

  @Prop()
  readTime?: string;

  @Prop({ type: Object })
  author?: {
    name: string;
    slug: string;
  };

  @Prop({ type: [String] })
  tags?: string[];
}

export const NewsSchema = SchemaFactory.createForClass(News);
```

## gameacademybackend/apps/news/src/app/news/repos/news.repository.ts

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsEntity } from '../entities/news.entity';
import { News } from '../models/news.model';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(News.name) private readonly newsModel: Model<News>) {}

  async createNews(news: NewsEntity) {
    const newNews = new this.newsModel(news);
    return newNews.save();
  }

  async findNewsBySlug(slug: string) {
    return this.newsModel.findOne({ slug }).exec();
  }

  async findNewsById(id: string) {
    return this.newsModel.findById(id).exec();
  }

  async findAllNews(category?: string, search?: string) {
    const filter: any = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: 'i' } }, { 'author.name': { $regex: search, $options: 'i' } }];
    }
    return this.newsModel.find(filter).sort({ date: -1 }).exec();
  }

  async updateNews(id: string, news: Partial<NewsEntity>) {
    return this.newsModel.findByIdAndUpdate(id, news, { new: true }).exec();
  }

  async deleteNews(id: string) {
    return this.newsModel.findByIdAndDelete(id).exec();
  }
}
```

## gameacademybackend/apps/news/src/app/news/news.commands.ts

```ts
import { Body, Controller } from '@nestjs/common';
import {
  NewsCreate,
  NewsUpdate,
  NewsDelete,
  NewsGetById,
  NewsGetBySlug,
  NewsGetList,
  HealthCheck,
} from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { NewsService } from './news.service';

@Controller()
export class NewsCommands {
  constructor(private readonly newsService: NewsService) {}

  @RMQValidate()
  @RMQRoute(NewsCreate.topic)
  async createNews(@Body() dto: NewsCreate.Request): Promise<NewsCreate.Response> {
    return this.newsService.createNews(dto);
  }

  @RMQValidate()
  @RMQRoute(NewsUpdate.topic)
  async updateNews(@Body() dto: NewsUpdate.Request): Promise<NewsUpdate.Response> {
    return this.newsService.updateNews(dto);
  }

  @RMQValidate()
  @RMQRoute(NewsDelete.topic)
  async deleteNews(@Body() { id }: NewsDelete.Request): Promise<NewsDelete.Response> {
    return this.newsService.deleteNews(id);
  }

  @RMQValidate()
  @RMQRoute(NewsGetById.topic)
  async getNewsById(@Body() { id }: NewsGetById.Request): Promise<NewsGetById.Response> {
    const news = await this.newsService.getNewsById(id);
    return { news };
  }

  @RMQValidate()
  @RMQRoute(NewsGetBySlug.topic)
  async getNewsBySlug(@Body() { slug }: NewsGetBySlug.Request): Promise<NewsGetBySlug.Response> {
    const news = await this.newsService.getNewsBySlug(slug);
    return { news };
  }

  @RMQValidate()
  @RMQRoute(NewsGetList.topic)
  async getNewsList(@Body() dto: NewsGetList.Request): Promise<NewsGetList.Response> {
    const news = await this.newsService.getNewsList(dto.category, dto.search);
    return { news };
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'news') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'news',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'news',
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
          service: 'news',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
```

## gameacademybackend/apps/news/src/app/news/news.module.ts

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './models/news.model';
import { NewsRepository } from './repos/news.repository';
import { NewsCommands } from './news.commands';
import { NewsService } from './news.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }])],
  providers: [NewsRepository, NewsService],
  controllers: [NewsCommands],
})
export class NewsModule {}
```

## gameacademybackend/apps/news/src/app/news/news.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { NewsRepository } from './repos/news.repository';
import { NewsEntity } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async createNews(dto: any) {
    const existingNews = await this.newsRepository.findNewsBySlug(dto.slug);
    if (existingNews) {
      throw new Error('News with this slug already exists');
    }

    const newsEntity = new NewsEntity(dto);
    const newNews = await this.newsRepository.createNews(newsEntity);
    return { id: newNews._id.toString(), slug: newNews.slug };
  }

  async getNewsBySlug(slug: string) {
    const news = await this.newsRepository.findNewsBySlug(slug);
    if (!news) {
      throw new Error('News not found');
    }
    return new NewsEntity(news.toObject()).getPublicInfo();
  }

  async getNewsById(id: string) {
    const news = await this.newsRepository.findNewsById(id);
    if (!news) {
      throw new Error('News not found');
    }
    return new NewsEntity(news.toObject()).getPublicInfo();
  }

  async getNewsList(category?: string, search?: string) {
    const news = await this.newsRepository.findAllNews(category, search);
    return news.map((item) => new NewsEntity(item.toObject()).getPublicInfo());
  }

  async updateNews(dto: any) {
    const existingNews = await this.newsRepository.findNewsById(dto.id);
    if (!existingNews) {
      throw new Error('News not found');
    }

    const newsEntity = new NewsEntity(dto);
    await this.newsRepository.updateNews(dto.id, newsEntity);
    return { success: true };
  }

  async deleteNews(id: string) {
    const result = await this.newsRepository.deleteNews(id);
    if (!result) {
      throw new Error('News not found');
    }
    return { success: true };
  }
}
```

## gameacademybackend/apps/news/src/app/app.module.ts

```ts
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
```

## gameacademybackend/apps/news/src/main.ts

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
```

## gameacademybackend/apps/portfolio/src/app/configs/mongo.config.ts

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

## gameacademybackend/apps/portfolio/src/app/configs/rmq.config.ts

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

## gameacademybackend/apps/portfolio/src/app/portfolio/entities/portfolio.entity.ts

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPortfolio } from '@shared/interfaces';
import { Types } from 'mongoose';

export class PortfolioEntity implements IPortfolio {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image?: string;
  description?: string;
  releaseDate?: string;
  download?: string;
  phases?: Array<{
    title: string;
    date: string;
    description: string;
    skills?: Array<{ name: string; level: number }>;
  }>;
  goals?: string[];
  features?: string[];
  screenshots?: string[];
  hallOfFame?: boolean;
  authors?: Array<{
    name: string;
    slug: string;
    role: string;
  }>;
  year?: number;
  markdown?: string;
  tags?: string[];

  constructor(portfolio: Partial<PortfolioEntity>) {
    this._id = portfolio._id;
    this.slug = portfolio.slug || '';
    this.title = portfolio.title || '';
    this.category = portfolio.category || '';
    this.image = portfolio.image;
    this.description = portfolio.description;
    this.releaseDate = portfolio.releaseDate;
    this.download = portfolio.download;
    this.phases = portfolio.phases;
    this.goals = portfolio.goals;
    this.features = portfolio.features;
    this.screenshots = portfolio.screenshots;
    this.hallOfFame = portfolio.hallOfFame;
    this.authors = portfolio.authors;
    this.year = portfolio.year;
    this.markdown = portfolio.markdown;
    this.tags = portfolio.tags;
  }

  public getPublicInfo() {
    return {
      _id: this._id?.toString(),
      slug: this.slug,
      title: this.title,
      category: this.category,
      image: this.image,
      description: this.description,
      releaseDate: this.releaseDate,
      download: this.download,
      phases: this.phases,
      goals: this.goals,
      features: this.features,
      screenshots: this.screenshots,
      hallOfFame: this.hallOfFame,
      authors: this.authors,
      year: this.year,
      markdown: this.markdown,
      tags: this.tags,
    };
  }
}
```

## gameacademybackend/apps/portfolio/src/app/portfolio/models/portfolio.model.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PortfolioDocument = HydratedDocument<Portfolio>;

@Schema({ timestamps: true })
export class Portfolio {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  image?: string;

  @Prop()
  description?: string;

  @Prop()
  releaseDate?: string;

  @Prop()
  download?: string;

  @Prop({ type: [Object] })
  phases?: Array<{
    title: string;
    date: string;
    description: string;
    skills?: Array<{ name: string; level: number }>;
  }>;

  @Prop({ type: [String] })
  goals?: string[];

  @Prop({ type: [String] })
  features?: string[];

  @Prop({ type: [String] })
  screenshots?: string[];

  @Prop({ default: false })
  hallOfFame: boolean;

  @Prop({ type: [Object] })
  authors?: Array<{
    name: string;
    slug: string;
    role: string;
  }>;

  @Prop()
  year?: number;

  @Prop()
  markdown?: string;

  @Prop({ type: [String] })
  tags?: string[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
```

## gameacademybackend/apps/portfolio/src/app/portfolio/repos/portfolio.repository.ts

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortfolioEntity } from './../entities/portfolio.entity';
import { Portfolio } from './../models/portfolio.model';

@Injectable()
export class PortfolioRepository {
  constructor(@InjectModel(Portfolio.name) private readonly portfolioModel: Model<Portfolio>) {}

  async createPortfolio(portfolio: PortfolioEntity) {
    const newPortfolio = new this.portfolioModel(portfolio);
    return newPortfolio.save();
  }

  async findPortfolioBySlug(slug: string) {
    return this.portfolioModel.findOne({ slug }).exec();
  }

  async findPortfolioById(id: string) {
    return this.portfolioModel.findById(id).exec();
  }

  async findAllPortfolio(category?: string, hallOfFrame?: boolean) {
    const filter: any = {};
    if (category) filter.category = category;
    if (hallOfFrame !== undefined) filter.hallOfFrame = hallOfFrame;

    return this.portfolioModel.find(filter).sort({ year: -1 }).exec();
  }

  async updatePortfolio(id: string, portfolio: Partial<PortfolioEntity>) {
    return this.portfolioModel.findByIdAndUpdate(id, portfolio, { new: true }).exec();
  }

  async deletePortfolio(id: string) {
    return this.portfolioModel.findByIdAndDelete(id).exec();
  }

  async searchPortfolio(searchTerm: string) {
    return this.portfolioModel
      .find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { 'authors.name': { $regex: searchTerm, $options: 'i' } },
        ],
      })
      .exec();
  }
}
```

## gameacademybackend/apps/portfolio/src/app/portfolio/portfolio.commands.ts

```ts
import { Body, Controller } from '@nestjs/common';
import {
  PortfolioCreate,
  PortfolioUpdate,
  PortfolioDelete,
  PortfolioGetBySlug,
  PortfolioGetList,
  HealthCheck,
} from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { PortfolioService } from './portfolio.service';

@Controller()
export class PortfolioCommands {
  constructor(private readonly portfolioService: PortfolioService) {}

  @RMQValidate()
  @RMQRoute(PortfolioCreate.topic)
  async createPortfolio(@Body() dto: PortfolioCreate.Request): Promise<PortfolioCreate.Response> {
    return this.portfolioService.createPortfolio(dto);
  }

  @RMQValidate()
  @RMQRoute(PortfolioUpdate.topic)
  async updatePortfolio(@Body() dto: PortfolioUpdate.Request): Promise<PortfolioUpdate.Response> {
    return this.portfolioService.updatePortfolio(dto);
  }

  @RMQValidate()
  @RMQRoute(PortfolioDelete.topic)
  async deletePortfolio(@Body() { id }: PortfolioDelete.Request): Promise<PortfolioDelete.Response> {
    return this.portfolioService.deletePortfolio(id);
  }

  @RMQValidate()
  @RMQRoute(PortfolioGetBySlug.topic)
  async getPortfolioBySlug(@Body() { slug }: PortfolioGetBySlug.Request): Promise<PortfolioGetBySlug.Response> {
    const portfolio = await this.portfolioService.getPortfolioBySlug(slug);
    return { portfolio };
  }

  @RMQValidate()
  @RMQRoute(PortfolioGetList.topic)
  async getPortfolioList(@Body() dto: PortfolioGetList.Request): Promise<PortfolioGetList.Response> {
    const portfolio = await this.portfolioService.getPortfolioList(dto.category, dto.hallOfFrame);
    return { portfolio };
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'portfolio') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'portfolio',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'portfolio',
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
          service: 'portfolio',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
```

## gameacademybackend/apps/portfolio/src/app/portfolio/portfolio.module.ts

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Portfolio, PortfolioSchema } from './models/portfolio.model';
import { PortfolioRepository } from './repos/portfolio.repository';
import { PortfolioCommands } from './portfolio.commands';
import { PortfolioQueries } from './portfolio.queries';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Portfolio.name, schema: PortfolioSchema }])],
  providers: [PortfolioRepository, PortfolioService],
  controllers: [PortfolioCommands, PortfolioQueries],
})
export class PortfolioModule {}
```

## gameacademybackend/apps/portfolio/src/app/portfolio/portfolio.queries.ts

```ts
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { PortfolioService } from './portfolio.service';

export namespace PortfolioSearch {
  export const topic = 'portfolio.search.query';
  export class Request {
    query: string;
  }
  export class Response {
    portfolio: any[];
  }
}

@Controller()
export class PortfolioQueries {
  constructor(private readonly portfolioService: PortfolioService) {}

  @RMQValidate()
  @RMQRoute(PortfolioSearch.topic)
  async searchPortfolio(@Body() { query }: PortfolioSearch.Request): Promise<PortfolioSearch.Response> {
    const portfolio = await this.portfolioService.searchPortfolio(query);
    return { portfolio };
  }
}
```

## gameacademybackend/apps/portfolio/src/app/portfolio/portfolio.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { PortfolioRepository } from './repos/portfolio.repository';
import { PortfolioEntity } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(private readonly portfolioRepository: PortfolioRepository) {}

  async createPortfolio(dto: any) {
    const existingPortfolio = await this.portfolioRepository.findPortfolioBySlug(dto.slug);
    if (existingPortfolio) {
      throw new Error('Portfolio with this slug already exists');
    }

    const portfolioEntity = new PortfolioEntity(dto);
    const newPortfolio = await this.portfolioRepository.createPortfolio(portfolioEntity);
    return { id: newPortfolio._id.toString(), slug: newPortfolio.slug };
  }

  async getPortfolioBySlug(slug: string) {
    const portfolio = await this.portfolioRepository.findPortfolioBySlug(slug);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }
    return new PortfolioEntity(portfolio.toObject()).getPublicInfo();
  }

  async getPortfolioById(id: string) {
    const portfolio = await this.portfolioRepository.findPortfolioById(id);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }
    return new PortfolioEntity(portfolio.toObject()).getPublicInfo();
  }

  async getPortfolioList(category?: string, hallOfFrame?: boolean) {
    const portfolio = await this.portfolioRepository.findAllPortfolio(category, hallOfFrame);
    return portfolio.map((item) => new PortfolioEntity(item.toObject()).getPublicInfo());
  }

  async updatePortfolio(dto: any) {
    const existingPortfolio = await this.portfolioRepository.findPortfolioById(dto.id);
    if (!existingPortfolio) {
      throw new Error('Portfolio not found');
    }

    const portfolioEntity = new PortfolioEntity(dto);
    await this.portfolioRepository.updatePortfolio(dto.id, portfolioEntity);
    return { success: true };
  }

  async deletePortfolio(id: string) {
    const result = await this.portfolioRepository.deletePortfolio(id);
    if (!result) {
      throw new Error('Portfolio not found');
    }
    return { success: true };
  }

  async searchPortfolio(searchTerm: string) {
    const portfolio = await this.portfolioRepository.searchPortfolio(searchTerm);
    return portfolio.map((item) => new PortfolioEntity(item.toObject()).getPublicInfo());
  }
}
```

## gameacademybackend/apps/portfolio/src/app/app.module.ts

```ts
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
```

## gameacademybackend/apps/portfolio/src/main.ts

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
  // Добавьте обработку необработанных исключений
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`, error.stack);
  });
  const port = process.env.PORT || 3005;
  setupGracefulShutdown(app);
  await app.listen(port);
  logger.log(`🚀 Application Portfolio is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
```

## gameacademybackend/apps/projects/src/admin/admin-duplicates.controller.ts

```ts
import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { DuplicateService } from '../duplicate/duplicate.service';
import { Types } from 'mongoose';

@Controller('admin/duplicates')
export class AdminDuplicatesController {
  constructor(private readonly duplicateService: DuplicateService) {}

  @Get()
  async listAll() {
    const items = await this.duplicateService.findAll();
    return {
      duplicates: items.map((d) => ({
        _id: d._id.toString(),
        zipHash: d.zipHash,
        author: d.author,
        productName: d.productName,
        fileHashes: d.fileHashes,
        metadata: d.metadata,

        createdAt: ((d.get('createdAt') as Date | undefined) ?? (d._id as Types.ObjectId).getTimestamp()).toISOString(),
      })),
    };
  }

  @Post('delete')
  async delete(@Body('id') id: string) {
    if (!id) throw new BadRequestException('Id required');
    await this.duplicateService.remove(id);
    return { success: true };
  }
}
```

## gameacademybackend/apps/projects/src/admin/admin-games.controller.ts

```ts
import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { GamesService } from '../games/games.service';
import { RMQService } from 'nestjs-rmq';
import { AccountUserInfo } from '@shared/contracts';

@Controller('admin/games')
export class AdminGamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly rmqService: RMQService,
  ) {}

  @Get()
  async listAll() {
    const games = await this.gamesService.findAll();

    const enriched = await Promise.all(
      games.map(async (g) => {
        const uploaderIdStr = g.uploader.toString();

        let uploaderLabel = uploaderIdStr;
        try {
          const { profile } = await this.rmqService.send<AccountUserInfo.Request, AccountUserInfo.Response>(
            AccountUserInfo.topic,
            { id: uploaderIdStr },
          );
          uploaderLabel = `${profile.displayName} (${profile.email})`;
        } catch {
          /* empty */
        }

        return {
          _id: g._id.toString(),
          title: g.title,
          uploader: uploaderLabel,
          createdAt: g.get('createdAt') as Date,
        };
      }),
    );

    return { games: enriched };
  }

  @Post('delete')
  async delete(@Body('id') id: string) {
    if (!id) throw new BadRequestException('Id required');
    await this.gamesService.remove(id);
    return { success: true };
  }
}
```

## gameacademybackend/apps/projects/src/admin/admin.module.ts

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesService } from '../games/games.service';
import { Game, GameSchema } from '../games/schemas/game.schema';
import { MinioModule } from '../minio/minio.module';
import { DuplicateModule } from '../duplicate/duplicate.module';
import { AdminGamesController } from './admin-games.controller';
import { AdminDuplicatesController } from './admin-duplicates.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]), MinioModule, DuplicateModule],
  controllers: [AdminGamesController, AdminDuplicatesController],
  providers: [GamesService],
})
export class AdminModule {}
```

## gameacademybackend/apps/projects/src/assets/.gitkeep

```

```

## gameacademybackend/apps/projects/src/comments/dtos/create-comment.dto.ts

```ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsOptional()
  @IsString()
  parent?: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
```

## gameacademybackend/apps/projects/src/comments/models/user.model.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: false })
export class User {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  role: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
```

## gameacademybackend/apps/projects/src/comments/schemas/comment.schema.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  gameId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Comment.name })
  parent?: Types.ObjectId;

  @Prop({ required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
```

## gameacademybackend/apps/projects/src/comments/schemas/user.schema.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: false })
export class User {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  role: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
```

## gameacademybackend/apps/projects/src/comments/comments.controller.ts

```ts
import { Controller, Body } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { CommentCreate, CommentList } from '@shared/contracts';
import { CommentsService } from './comments.service';

@Controller()
export class CommentsController {
  constructor(private readonly svc: CommentsService) {}

  @RMQRoute(CommentCreate.topic)
  async create(@Body() dto: CommentCreate.Request & { userId: string }) {
    const { userId, ...commentDto } = dto;

    return this.svc.create(commentDto, userId);
  }

  @RMQRoute(CommentList.topic)
  async list(@Body() dto: CommentList.Request) {
    const comments = await this.svc.findByGame(dto.gameId);
    return { comments };
  }
}
```

## gameacademybackend/apps/projects/src/comments/comments.module.ts

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { User, UserSchema } from './models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
```

## gameacademybackend/apps/projects/src/comments/comments.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(dto: CreateCommentDto, userId: string) {
    const comment = new this.commentModel({
      author: new Types.ObjectId(userId),
      gameId: new Types.ObjectId(dto.gameId),
      parent: dto.parent ? new Types.ObjectId(dto.parent) : undefined,
      content: dto.content,
    });
    return comment.save();
  }

  async findByGame(gameId: string) {
    const docs = await this.commentModel
      .find({ gameId: new Types.ObjectId(gameId) })
      .sort({ createdAt: 1 })
      .populate('author', 'displayName role')
      .lean()
      .exec();

    const map = new Map<string, any[]>();
    docs.forEach((c) => {
      const key = c.parent?.toString() || 'root';
      map.set(key, (map.get(key) || []).concat(c));
    });

    function build(parentId: string) {
      return (map.get(parentId) || []).map((c) => ({
        ...c,
        replies: build(c._id.toString()),
      }));
    }

    return build('root');
  }
}
```

## gameacademybackend/apps/projects/src/comments/jwt.guard.ts

```ts
import { AuthGuard } from '@nestjs/passport';

export class JWTAuthGuard extends AuthGuard('jwt') {}
```

## gameacademybackend/apps/projects/src/configs/jwt.config.ts

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

## gameacademybackend/apps/projects/src/configs/minio.config.ts

```ts
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Global()
@Module({
  providers: [
    {
      provide: 'MINIO',
      useFactory: (cfg: ConfigService) => {
        return new Minio.Client({
          endPoint: cfg.get('MINIO_ENDPOINT'),
          port: parseInt(cfg.get('MINIO_PORT', '9000')),
          useSSL: false,
          accessKey: cfg.get('MINIO_ACCESS_KEY'),
          secretKey: cfg.get('MINIO_SECRET_KEY'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['MINIO'],
})
export class MinioModule {}
```

## gameacademybackend/apps/projects/src/configs/mongo.config.ts

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

## gameacademybackend/apps/projects/src/configs/rmq.config.ts

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
    autoBindingRoutes: true,
    serviceName: 'projects-ms',
  }),
});
```

## gameacademybackend/apps/projects/src/duplicate/schemas/duplicate.schema.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Duplicate {
  @Prop({ required: true, unique: true })
  zipHash: string;

  @Prop({ type: Map, of: String, default: {} })
  fileHashes: Record<string, string>;

  @Prop() author?: string;
  @Prop() productName?: string;

  @Prop({ type: SchemaTypes.Mixed, default: {} })
  metadata: Record<string, any>;
}

export type DuplicateDocument = Duplicate & Document;
export const DuplicateSchema = SchemaFactory.createForClass(Duplicate);
```

## gameacademybackend/apps/projects/src/duplicate/duplicate.controller.ts

```ts
import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DuplicateService } from './duplicate.service';

@Controller('duplicate')
export class DuplicateController {
  constructor(private readonly dup: DuplicateService) {}

  /**
   * Принимает файл в multipart/form-data под ключом `file`.
   * Возвращает { isDuplicate: boolean, record: Duplicate }
   */
  @Post()
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 50_000_000 } }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file?.buffer) throw new BadRequestException('Файл не получен');

    if (!(file.buffer[0] === 0x50 && file.buffer[1] === 0x4b)) {
      throw new BadRequestException('Ожидается ZIP-архив Unity WebGL сборки');
    }

    const metadata = { mimetype: file.mimetype, size: file.size };
    return this.dup.checkOrRegister(file.buffer, file.originalname, metadata);
  }
}
```

## gameacademybackend/apps/projects/src/duplicate/duplicate.module.ts

```ts
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Duplicate, DuplicateSchema } from './schemas/duplicate.schema';
import { DuplicateService } from './duplicate.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Duplicate.name, schema: DuplicateSchema }])],
  providers: [DuplicateService],
  exports: [DuplicateService],
})
export class DuplicateModule {}
```

## gameacademybackend/apps/projects/src/duplicate/duplicate.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHash } from 'crypto';
import JSZip from 'jszip';
import { brotliDecompressSync, gunzipSync } from 'zlib';
import { Duplicate, DuplicateDocument } from './schemas/duplicate.schema';

interface CheckOpts {
  dryRun?: boolean;
}

const JACCARD_THRESHOLD = Number(process.env.JACCARD || 0.5);

function tryDecompress(entryName: string, buf: Buffer): Buffer {
  const isBr = entryName.endsWith('.br');
  const isGz = entryName.endsWith('.gz') || entryName.endsWith('.unityweb');

  if (!isBr && !isGz) return buf;

  try {
    return isBr ? brotliDecompressSync(buf) : gunzipSync(buf);
  } catch {
    return buf;
  }
}

function mapValues(recorded: unknown): string[] {
  if (recorded instanceof Map) return Array.from(recorded.values());
  if (recorded && typeof recorded === 'object') return Object.values(recorded as Record<string, string>);
  return [];
}

function encodePath(path: string): string {
  return path
    .replace(/^__MACOSX\/.*$/, '')
    .replace(/\.(br|gz|unityweb)$/i, '')
    .replace(/\./g, '|');
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

@Injectable()
export class DuplicateService {
  constructor(
    @InjectModel(Duplicate.name)
    private readonly dupModel: Model<DuplicateDocument>,
  ) {}

  computeHash(buf: Buffer) {
    return createHash('sha256').update(buf).digest('hex');
  }

  private isZip(buf: Buffer) {
    return buf.length > 3 && buf[0] === 0x50 && buf[1] === 0x4b;
  }

  private async buildSignature(buffer: Buffer) {
    const zip = await JSZip.loadAsync(buffer);

    const fileHashes: Record<string, string> = {};
    let author = '';
    let productName = '';

    await Promise.all(
      Object.values(zip.files).map(async (entry) => {
        if (entry.dir) return;

        const raw = await entry.async('nodebuffer');
        const content = tryDecompress(entry.name, raw);

        const key = encodePath(entry.name);
        fileHashes[key] = this.computeHash(content);

        if (/loader\.js/i.test(entry.name)) {
          const txt = content.toString('utf8');
          author = /companyName:"([^"]+)"/.exec(txt)?.[1] ?? author;
          productName = /productName:"([^"]+)"/.exec(txt)?.[1] ?? productName;
        }
      }),
    );

    return { fileHashes, author, productName };
  }

  async checkOrRegister(
    buffer: Buffer,
    originalName?: string,
    metadata: Record<string, any> = {},
    opts: CheckOpts = {},
  ) {
    const zipHash = this.computeHash(buffer);
    const full = await this.dupModel.findOne({ zipHash });
    if (full) return { duplicate: 'full', record: full };

    let signature: Awaited<ReturnType<typeof this.buildSignature>> | null = null;
    if (this.isZip(buffer)) {
      signature = await this.buildSignature(buffer);

      const sigSet = new Set(Object.values(signature.fileHashes));
      const candidates = await this.dupModel.find();

      for (const candidate of candidates) {
        const candSet = new Set(mapValues(candidate.fileHashes));
        const jac = jaccard(sigSet, candSet);

        if (jac >= JACCARD_THRESHOLD) {
          return {
            duplicate: 'relative',
            similarity: jac,
            matched: [...sigSet].filter((h) => candSet.has(h)),
            record: candidate,
          };
        }
      }
    }

    if (opts.dryRun) {
      return { duplicate: false } as const;
    }

    const created = await this.dupModel.create({
      zipHash,
      ...signature,
      metadata,
      originalName,
    });

    return { duplicate: false, record: created };
  }

  async findAll() {
    return this.dupModel.find().sort({ _id: -1 }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.dupModel.findByIdAndDelete(id).exec();
  }
}
```

## gameacademybackend/apps/projects/src/games/dto/create-game.dto.ts

```ts
import { IsString, IsOptional, IsArray, ArrayNotEmpty, ArrayUnique, IsUrl, IsMongoId } from 'class-validator';

export class CreateGameDto {
  @IsString() title: string;

  @IsString() description: string;

  @IsMongoId()
  @IsString()
  uploader: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  genres: string[];

  @IsString() cover: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  authors?: string[];
}
```

## gameacademybackend/apps/projects/src/games/schemas/game.schema.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true }) title: string;

  @Prop() description: string;

  @Prop({ required: true }) prefix: string;

  @Prop({ type: [String], default: [] }) models: string[];

  @Prop({ type: [String], default: [] }) images: string[];

  @Prop({ type: [String], default: [] }) videos: string[];

  @Prop({ type: [String], default: [] }) genres: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  uploader: Types.ObjectId;

  @Prop({ required: true }) cover: string;

  @Prop() githubUrl?: string;

  @Prop({ default: false }) playable: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  authors: Types.ObjectId[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
```

## gameacademybackend/apps/projects/src/games/games.controller.ts

```ts
import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  Get,
  Param,
  UploadedFiles,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
      { name: 'models', maxCount: 20 },
      { name: 'images', maxCount: 20 },
      { name: 'videos', maxCount: 10 },
    ]),
  )
  async uploadGame(
    @UploadedFiles()
    files: {
      file?: Express.Multer.File[];
      cover?: Express.Multer.File[];
      models?: Express.Multer.File[];
      images?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
    @Body() createDto: CreateGameDto,
  ) {
    const coverFile = files.cover?.[0];
    if (!coverFile) throw new BadRequestException('Cover image is required');

    const gameFile = files.file?.[0];
    if (!gameFile && !createDto.githubUrl) {
      throw new BadRequestException('Either a ZIP build or a GitHub URL must be provided');
    }

    return this.gamesService.create(
      createDto,
      gameFile?.buffer,
      files.models,
      files.images,
      files.videos,
      coverFile.buffer,
      coverFile.originalname,
      coverFile.mimetype,
      !!gameFile,
    );
  }

  @Get()
  async list(@Query('q') q?: string, @Query('uploader') uploader?: string) {
    return this.gamesService.findAll(q, uploader);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Post('delete')
  async delete(@Body('id') id: string) {
    if (!id) throw new BadRequestException('Id required');
    await this.gamesService.remove(id);
    return { success: true };
  }
}
```

## gameacademybackend/apps/projects/src/games/games.module.ts

```ts
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { MinioModule } from '../minio/minio.module';
import { DuplicateModule } from '../duplicate/duplicate.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]), MinioModule, DuplicateModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
```

## gameacademybackend/apps/projects/src/games/games.service.ts

```ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { MinioService } from '../minio/minio.service';
import * as unzipper from 'unzipper';
import { randomBytes } from 'crypto';
import { DuplicateService } from '../duplicate/duplicate.service';

export const toArray = (val: unknown): string[] =>
  Array.isArray(val) ? val : val === undefined || val === null ? [] : [String(val)];

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    private minio: MinioService,
    private duplicate: DuplicateService,
  ) {}

  async create(
    createDto: CreateGameDto,
    gameBuffer?: Buffer,
    modelFiles?: Express.Multer.File[],
    imageFiles?: Express.Multer.File[],
    videoFiles?: Express.Multer.File[],
    coverBuffer?: Buffer,
    coverName?: string,
    coverMime?: string,
    playable = false,
  ): Promise<GameDocument> {
    const prefix = randomBytes(4).toString('hex') + '/';

    if (playable && gameBuffer) {
      const res = await this.duplicate.checkOrRegister(
        gameBuffer,
        `${createDto.title}-build.zip`,
        { type: 'build' },
        { dryRun: true },
      );
      if (res.duplicate) throw new ConflictException(`Duplicate build (id: ${res.record._id})`);
    }

    const stagedModels = modelFiles ? [...modelFiles] : [];
    for (const f of stagedModels) {
      const res = await this.duplicate.checkOrRegister(f.buffer, f.originalname, { type: 'model' }, { dryRun: true });
      if (res.duplicate) throw new ConflictException(`Duplicate model "${f.originalname}" (id: ${res.record._id})`);
    }

    const modelsKeys: string[] = [];
    const imagesKeys: string[] = [];
    const videosKeys: string[] = [];

    if (playable && gameBuffer) {
      await this.duplicate.checkOrRegister(gameBuffer, `${createDto.title}-build.zip`, { type: 'build' });

      const dir = await unzipper.Open.buffer(gameBuffer);
      await Promise.all(
        dir.files.map(async (e) => {
          if (e.type !== 'File') return;
          const buf = await e.buffer();
          const key = `${prefix}${e.path}`;
          let ct = 'application/octet-stream';
          if (/\.js(\.br)?$/.test(e.path)) ct = 'application/javascript';
          else if (/\.wasm(\.br)?$/.test(e.path)) ct = 'application/wasm';
          const ce = e.path.endsWith('.br') ? 'br' : undefined;
          await this.minio.uploadBuild(key, buf, ct, ce);
        }),
      );
    }

    for (const f of stagedModels) {
      await this.duplicate.checkOrRegister(f.buffer, f.originalname, { type: 'model' });
      const key = `${prefix}models/${f.originalname}`;
      await this.minio.uploadModel(key, f.buffer, f.mimetype);
      modelsKeys.push(key);
    }

    if (imageFiles) {
      for (const f of imageFiles) {
        const key = `${prefix}images/${f.originalname}`;
        await this.minio.uploadImage(key, f.buffer, f.mimetype);
        imagesKeys.push(key);
      }
    }

    if (videoFiles) {
      for (const f of videoFiles) {
        const key = `${prefix}videos/${f.originalname}`;
        await this.minio.uploadVideo(key, f.buffer, f.mimetype);
        videosKeys.push(key);
      }
    }

    if (!coverBuffer || !coverName || !coverMime) {
      throw new NotFoundException('Cover missing');
    }
    const coverKey = `${prefix}cover/${coverName}`;
    await this.minio.uploadImage(coverKey, coverBuffer, coverMime);

    const uploaderObjectId = new Types.ObjectId(createDto.uploader);
    const authorsObjectIds = toArray(createDto.authors).map((id) => new Types.ObjectId(id));
    const genresArray = toArray(createDto.genres);

    const gameData: Partial<Game> = {
      title: createDto.title,
      description: createDto.description,
      uploader: uploaderObjectId,
      authors: authorsObjectIds,
      genres: genresArray,
      cover: `${prefix}cover/${coverName}`,
      githubUrl: createDto.githubUrl,
      playable,
      models: modelsKeys,
      images: imagesKeys,
      videos: videosKeys,
      prefix,
    };

    const game = new this.gameModel(gameData);
    return game.save();
  }

  async findAll(q?: string, uploader?: string): Promise<GameDocument[]> {
    const filter: any = {};

    if (uploader) {
      const orConditions: any[] = [{ uploader }];

      if (Types.ObjectId.isValid(uploader)) {
        orConditions.push({ authors: new Types.ObjectId(uploader) });
      }

      filter.$or = orConditions;
    }

    if (q) {
      const regex = new RegExp(q, 'i');

      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, { $or: [{ title: regex }, { description: regex }, { genres: q }] }];
        delete filter.$or;
      } else {
        filter.$or = [{ title: regex }, { description: regex }, { genres: q }];
      }
    }

    return this.gameModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<GameDocument> {
    const game = await this.gameModel.findById(id).exec();
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async remove(id: string): Promise<void> {
    const game = await this.gameModel.findByIdAndDelete(id).exec();
    if (!game) throw new NotFoundException('Game not found');
  }
}
```

## gameacademybackend/apps/projects/src/minio/minio.module.ts

```ts
import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';

@Module({
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule {}
```

## gameacademybackend/apps/projects/src/minio/minio.service.ts

```ts
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  CreateBucketCommand,
  HeadBucketCommand,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import * as stream from 'stream';

@Injectable()
export class MinioService implements OnModuleInit {
  private client: S3Client;
  private bucket: string;
  private modelsBucket: string;
  private imagesBucket: string;
  private videosBucket: string;

  constructor() {
    const {
      MINIO_ENDPOINT,
      MINIO_ACCESS_KEY,
      MINIO_SECRET_KEY,
      MINIO_BUCKET,
      MINIO_MODELS_BUCKET,
      MINIO_IMAGES_BUCKET,
      MINIO_VIDEOS_BUCKET,
      MINIO_FORCE_PATH_STYLE,
      MINIO_PROTOCOL,
    } = process.env;
    this.bucket = MINIO_BUCKET;
    this.modelsBucket = MINIO_MODELS_BUCKET;
    this.imagesBucket = MINIO_IMAGES_BUCKET;
    this.videosBucket = MINIO_VIDEOS_BUCKET;
    this.client = new S3Client({
      endpoint: `${MINIO_PROTOCOL}://${MINIO_ENDPOINT}`,
      region: 'us-east-1',
      credentials: {
        accessKeyId: MINIO_ACCESS_KEY,
        secretAccessKey: MINIO_SECRET_KEY,
      },
      forcePathStyle: MINIO_FORCE_PATH_STYLE === 'true',
    });
  }

  async onModuleInit() {
    for (const name of [this.bucket, this.modelsBucket, this.imagesBucket, this.videosBucket]) {
      await this.ensureBucketExists(name);
    }
  }

  private async ensureBucketExists(name: string) {
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: name }));
      return;
    } catch (err: any) {
      const status = err.$metadata?.httpStatusCode;
      const isNotFound = err.name === 'NotFound' || status === 404;
      const isRulesError = err.message?.includes('Rules evaluation failed');

      if (isNotFound) {
        await this.client.send(new CreateBucketCommand({ Bucket: name }));
        console.log(`✅ Created bucket ${name}`);
        return;
      }
      if (isRulesError) {
        console.warn(`Bucket "${name}" exists with policy error, continuing.`);
        return;
      }
      throw new InternalServerErrorException(`MinIO bucket "${name}" check failed: ${err.message}`);
    }
  }

  async uploadObject(
    bucketName: string,
    key: string,
    body: Buffer | stream.Readable,
    contentType: string,
    contentEncoding?: string,
  ) {
    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      ...(contentEncoding ? { ContentEncoding: contentEncoding } : {}),
    };
    try {
      await this.client.send(new PutObjectCommand(params));
    } catch (err: any) {
      throw new InternalServerErrorException(`MinIO upload error: ${err.message}`);
    }
  }

  uploadBuild(key: string, body: Buffer, contentType: string, contentEncoding?: string) {
    return this.uploadObject(this.bucket, key, body, contentType, contentEncoding);
  }
  uploadModel(key: string, body: Buffer, contentType: string) {
    return this.uploadObject(this.modelsBucket, key, body, contentType);
  }
  uploadImage(key: string, body: Buffer, contentType: string) {
    return this.uploadObject(this.imagesBucket, key, body, contentType);
  }
  uploadVideo(key: string, body: Buffer, contentType: string) {
    return this.uploadObject(this.videosBucket, key, body, contentType);
  }

  getPublicUrl(key: string, bucket: 'build' | 'models' | 'images' | 'videos' = 'build') {
    const { MINIO_ENDPOINT, MINIO_PROTOCOL } = process.env;
    const buckets = {
      build: this.bucket,
      models: this.modelsBucket,
      images: this.imagesBucket,
      videos: this.videosBucket,
    };
    const b = buckets[bucket];
    return `${MINIO_PROTOCOL}://${MINIO_ENDPOINT}/${b}/${key}`;
  }
}
```

## gameacademybackend/apps/projects/src/app.controller.ts

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

## gameacademybackend/apps/projects/src/app.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongoConfig } from './configs/mongo.config';
import { GamesModule } from './games/games.module';
import { MinioModule } from './minio/minio.module';
import { CommentsModule } from './comments/comments.module';
import { getRMQConfig } from '@shared/configs';
import { RMQModule } from 'nestjs-rmq';
import { DuplicateModule } from './duplicate/duplicate.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.projects.env',
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    RMQModule.forRootAsync(getRMQConfig('projects')),
    MinioModule,
    CommentsModule,
    GamesModule,
    DuplicateModule,
    AdminModule,
  ],
})
export class AppModule {}
```

## gameacademybackend/apps/projects/src/app.service.ts

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

## gameacademybackend/apps/projects/src/main.ts

```ts
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
```

## gameacademybackend/apps/staff/src/app/configs/mongo.config.ts

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

## gameacademybackend/apps/staff/src/app/configs/rmq.config.ts

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

## gameacademybackend/apps/staff/src/app/staff/entities/staff.entity.ts

```ts
/* eslint-disable prettier/prettier */
import { IStaff } from '@shared/interfaces';
import { Types } from 'mongoose';

export class StaffEntity implements IStaff {
  _id?: Types.ObjectId;
  slug: string;
  name: string;
  position: string;
  photo?: string;
  title?: string;
  rarity?: "LEGENDARY" | "RARE" | "COMMON";
  email?: string;
  telegram?: string;
  github?: string;
  bio?: string;
  researchInterests?: string[];
  stats?: Array<{ label: string; value: number }>;
  skills?: Array<{
    name: string;
    level: number;
    description?: string;
    subskills?: Array<{ name: string; description?: string }>;
  }>;
  achievements?: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
  // Устаревшие/альтернативные поля
  id?: string | number;
  image?: string;
  tags?: string[];
  contact?: string;

  constructor(staff: Partial<StaffEntity>) {
    this._id = staff._id;
    this.slug = staff.slug || '';
    this.name = staff.name || '';
    this.position = staff.position || '';
    this.photo = staff.photo;
    this.title = staff.title;
    this.rarity = staff.rarity;
    this.email = staff.email;
    this.telegram = staff.telegram;
    this.github = staff.github;
    this.bio = staff.bio;
    this.researchInterests = staff.researchInterests;
    this.stats = staff.stats;
    this.skills = staff.skills;
    this.achievements = staff.achievements;
    // Устаревшие/альтернативные поля
    this.id = staff.id;
    this.image = staff.image;
    this.tags = staff.tags;
    this.contact = staff.contact;
  }

  public getPublicInfo() {
    return {
      _id: this._id?.toString(),
      slug: this.slug,
      name: this.name,
      position: this.position,
      photo: this.photo,
      title: this.title,
      rarity: this.rarity,
      email: this.email,
      telegram: this.telegram,
      github: this.github,
      bio: this.bio,
      researchInterests: this.researchInterests,
      stats: this.stats,
      skills: this.skills,
      achievements: this.achievements,
      // Устаревшие/альтернативные поля
      id: this.id || this._id?.toString(),
      image: this.image || this.photo,
      tags: this.tags,
      contact: this.contact,
    };
  }
}
```

## gameacademybackend/apps/staff/src/app/staff/models/staff.model.ts

```ts
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema({ timestamps: true })
export class Staff {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  position: string;

  @Prop()
  photo?: string;

  @Prop()
  title?: string;

  @Prop({ enum: ['LEGENDARY', 'RARE', 'COMMON'] })
  rarity?: "LEGENDARY" | "RARE" | "COMMON";

  @Prop()
  email?: string;

  @Prop()
  telegram?: string;

  @Prop()
  github?: string;

  @Prop()
  bio?: string;

  @Prop({ type: [String] })
  researchInterests?: string[];

  @Prop({ type: [Object] })
  stats?: Array<{ label: string; value: number }>;

  @Prop({ type: [Object] })
  skills?: Array<{
    name: string;
    level: number;
    description?: string;
    subskills?: Array<{ name: string; description?: string }>;
  }>;

  @Prop({ type: [Object] })
  achievements?: Array<{
    title: string;
    icon: string;
    description: string;
  }>;

  // Устаревшие/альтернативные поля
  @Prop()
  image?: string;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop()
  contact?: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
```

## gameacademybackend/apps/staff/src/app/staff/repos/staff.repository.ts

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaffEntity } from './../entities/staff.entity';
import { Staff } from './../models/staff.model';

@Injectable()
export class StaffRepository {
  constructor(@InjectModel(Staff.name) private readonly staffModel: Model<Staff>) {}

  async createStaff(staff: StaffEntity) {
    const newStaff = new this.staffModel(staff);
    return newStaff.save();
  }

  async findStaffBySlug(slug: string) {
    return this.staffModel.findOne({ slug }).exec();
  }

  async findStaffById(id: string) {
    return this.staffModel.findById(id).exec();
  }

  async findAllStaff(position?: string, rarity?: string) {
    const filter: any = {};
    if (position) filter.position = position;
    if (rarity) filter.rarity = rarity;

    return this.staffModel.find(filter).sort({ name: 1 }).exec();
  }

  async updateStaff(id: string, staff: Partial<StaffEntity>) {
    return this.staffModel.findByIdAndUpdate(id, staff, { new: true }).exec();
  }

  async deleteStaff(id: string) {
    return this.staffModel.findByIdAndDelete(id).exec();
  }

  async searchStaff(searchTerm: string) {
    return this.staffModel
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { position: { $regex: searchTerm, $options: 'i' } },
          { bio: { $regex: searchTerm, $options: 'i' } },
          { researchInterests: { $regex: searchTerm, $options: 'i' } },
        ],
      })
      .exec();
  }
}
```

## gameacademybackend/apps/staff/src/app/staff/staff.commands.ts

```ts
import { Body, Controller } from '@nestjs/common';
import { StaffCreate, StaffUpdate, StaffDelete, StaffGetBySlug, StaffGetList, HealthCheck } from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { StaffService } from './staff.service';

@Controller()
export class StaffCommands {
  constructor(private readonly staffService: StaffService) {}

  @RMQValidate()
  @RMQRoute(StaffCreate.topic)
  async createStaff(@Body() dto: StaffCreate.Request): Promise<StaffCreate.Response> {
    return this.staffService.createStaff(dto);
  }

  @RMQValidate()
  @RMQRoute(StaffUpdate.topic)
  async updateStaff(@Body() dto: StaffUpdate.Request): Promise<StaffUpdate.Response> {
    return this.staffService.updateStaff(dto);
  }

  @RMQValidate()
  @RMQRoute(StaffDelete.topic)
  async deleteStaff(@Body() { id }: StaffDelete.Request): Promise<StaffDelete.Response> {
    return this.staffService.deleteStaff(id);
  }

  @RMQValidate()
  @RMQRoute(StaffGetBySlug.topic)
  async getStaffBySlug(@Body() { slug }: StaffGetBySlug.Request): Promise<StaffGetBySlug.Response> {
    const staff = await this.staffService.getStaffBySlug(slug);
    return { staff };
  }

  @RMQValidate()
  @RMQRoute(StaffGetList.topic)
  async getStaffList(@Body() dto: StaffGetList.Request): Promise<StaffGetList.Response> {
    const staff = await this.staffService.getStaffList(dto.position, dto.rarity);
    return { staff: staff };
  }

  @RMQValidate()
  @RMQRoute(HealthCheck.topic)
  async healthCheck(@Body() { service }: HealthCheck.Request): Promise<HealthCheck.Response> {
    // Проверяем, что запрос предназначен для этого сервиса
    if (service !== 'staff') {
      // Замените на имя своего сервиса
      return {
        status: 'error',
        service: 'staff',
        timestamp: new Date().toISOString(),
        details: 'Wrong service target',
      };
    }

    try {
      // Здесь добавьте реальные проверки здоровья сервиса
      // Например: проверка БД, внешних зависимостей и т.д.

      return {
        status: 'ok',
        service: 'staff',
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
          service: 'staff',
          timestamp: new Date().toISOString(),
          details: error.message,
        };
    }
  }
}
```

## gameacademybackend/apps/staff/src/app/staff/staff.module.ts

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './models/staff.model';
import { StaffRepository } from './repos/staff.repository';
import { StaffCommands } from './staff.commands';
import { StaffQueries } from './staff.queries';
import { StaffService } from './staff.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }])],
  providers: [StaffRepository, StaffService],
  controllers: [StaffCommands, StaffQueries],
})
export class StaffModule {}
```

## gameacademybackend/apps/staff/src/app/staff/staff.queries.ts

```ts
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { StaffService } from './staff.service';

export namespace StaffSearch {
  export const topic = 'staff.search.query';
  export class Request {
    query: string;
  }
  export class Response {
    staff: any[];
  }
}

@Controller()
export class StaffQueries {
  constructor(private readonly staffService: StaffService) {}

  @RMQValidate()
  @RMQRoute(StaffSearch.topic)
  async searchStaff(@Body() { query }: StaffSearch.Request): Promise<StaffSearch.Response> {
    const staff = await this.staffService.searchStaff(query);
    return { staff };
  }
}
```

## gameacademybackend/apps/staff/src/app/staff/staff.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { StaffRepository } from './repos/staff.repository';
import { StaffEntity } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async createStaff(dto: any) {
    const existingStaff = await this.staffRepository.findStaffBySlug(dto.slug);
    if (existingStaff) {
      throw new Error('Staff with this slug already exists');
    }

    const staffEntity = new StaffEntity(dto);
    const newStaff = await this.staffRepository.createStaff(staffEntity);
    return { id: newStaff._id.toString(), slug: newStaff.slug };
  }

  async getStaffBySlug(slug: string) {
    const staff = await this.staffRepository.findStaffBySlug(slug);
    if (!staff) {
      throw new Error('Staff not found');
    }
    return new StaffEntity(staff.toObject()).getPublicInfo();
  }

  async getStaffById(id: string) {
    const staff = await this.staffRepository.findStaffById(id);
    if (!staff) {
      throw new Error('Staff not found');
    }
    return new StaffEntity(staff.toObject()).getPublicInfo();
  }

  async getStaffList(position?: string, rarity?: string) {
    const staff = await this.staffRepository.findAllStaff(position, rarity);
    return staff.map((item) => new StaffEntity(item.toObject()).getPublicInfo());
  }

  async updateStaff(dto: any) {
    const existingStaff = await this.staffRepository.findStaffById(dto.id);
    if (!existingStaff) {
      throw new Error('Staff not found');
    }

    const staffEntity = new StaffEntity(dto);
    await this.staffRepository.updateStaff(dto.id, staffEntity);
    return { success: true };
  }

  async deleteStaff(id: string) {
    const result = await this.staffRepository.deleteStaff(id);
    if (!result) {
      throw new Error('Staff not found');
    }
    return { success: true };
  }

  async searchStaff(searchTerm: string) {
    const staff = await this.staffRepository.searchStaff(searchTerm);
    return staff.map((item) => new StaffEntity(item.toObject()).getPublicInfo());
  }
}
```

## gameacademybackend/apps/staff/src/app/app.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { getMongoConfig } from './configs/mongo.config';
import { getRMQConfig } from '@shared/configs';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.portfolio.env' }),
    RMQModule.forRootAsync(getRMQConfig('staff')),
    MongooseModule.forRootAsync(getMongoConfig()),
    StaffModule,
  ],
})
export class AppModule {}
```

## gameacademybackend/apps/staff/src/main.ts

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
  // Добавьте обработку необработанных исключений
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`, error.stack);
  });

  const port = process.env.PORT || 3006;
  setupGracefulShutdown(app);
  await app.listen(port);
  logger.log(`🚀 Application Staff is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
```