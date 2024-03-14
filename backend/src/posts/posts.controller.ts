import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteUsersDTO } from '../users/dto/crud.user.dto';
import { PostsService } from './posts.service';
import { GetPost, Pagination, PostBase, UpdatePost } from './dto/crud.posts.dto';
import { PaginatedModelClass } from '../../common/utils/model.manager';
import { PostModel } from './posts.model';

@ApiTags('Посты')
@Controller('post')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @ApiOperation({ summary: 'Получение всех постов' })
    @ApiOkResponse({ type: PaginatedModelClass<PostModel> })
    @Get('/all')
    async getUserTasks(
        @Query(new ValidationPipe({ transform: true })) requestData: Pagination,
    ): Promise<PaginatedModelClass<PostModel>> {
        return await this.postsService.getPosts(requestData);
    }

    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Создание поста' })
    @ApiOkResponse({ type: GetPost })
    @Post('/create')
    async createUserTask(@Body() dto: PostBase): Promise<GetPost> {
        return await this.postsService.createPost(dto);
    }

    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Обновление поста' })
    @ApiOkResponse({ type: GetPost })
    @Patch('/update/:id')
    async updateTask(@Body() dto: UpdatePost, @Param('id', new ParseIntPipe()) id: number): Promise<GetPost> {
        return await this.postsService.updatePost(dto, id);
    }

    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Удаление постов' })
    @ApiOkResponse({ type: [GetPost] })
    @Delete('/delete')
    async deleteUsers(@Body() dto: DeleteUsersDTO): Promise<GetPost[]> {
        return await this.postsService.deletePost(dto.ids);
    }
}
