import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { PostModel } from './posts.model';

@Module({
    providers: [PostsService],
    imports: [SequelizeModule.forFeature([PostModel]), UsersModule],
    controllers: [PostsController],
    exports: [PostsService],
})
export class PostsModule {}
