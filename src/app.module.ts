import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { UsersService } from './users/users.service';
import { UserEntity } from './users/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ApiTokenCheckMiddleware } from './auth/token.middleware';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ItemsModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTokenCheckMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
