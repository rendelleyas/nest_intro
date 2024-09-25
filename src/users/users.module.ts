import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [],
    imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
