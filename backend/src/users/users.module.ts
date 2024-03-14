import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';

@Module({
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
