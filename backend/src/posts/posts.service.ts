import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from './posts.model';
import { UsersService } from '../users/users.service';
import { GetPost, Pagination, PostBase, UpdatePost } from './dto/crud.posts.dto';
import { ModelManager, PaginatedModel, PaginatedModelClass } from '../../common/utils/model.manager';
import { NotFoundResponse } from '../../common/responses/not-found.response';

@Injectable()
export class PostsService {
    private _modelManager: ModelManager<PostModel>;

    constructor(
        @InjectModel(PostModel) private readonly postRepository: typeof PostModel,
        @Inject(UsersService) private readonly usersService: UsersService,
    ) {
        this._modelManager = new ModelManager(this.postRepository);
    }

    async getPosts(dto: Pagination): Promise<PaginatedModelClass<PostModel>> {
        return await this._modelManager.paginateFindAll(dto);
    }

    async getPostById(id: number): Promise<GetPost> {
        const post: GetPost = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundResponse(`Пост с id ${id} не существует.`);
        }
        return post;
    }

    async createPost(dto: PostBase): Promise<GetPost> {
        await this.usersService.getUserById(dto.userId);
        return await this.postRepository.create(dto, { returning: true }).then((post: PostModel) => {
            return post.dataValues;
        });
    }

    async updatePost(dto: UpdatePost, id: number): Promise<GetPost> {
        if (dto.userId) {
            await this.usersService.getUserById(dto.userId);
        }
        const post: GetPost = await this.getPostById(id);
        return await this.postRepository
            .update(dto, { where: { id: post.id }, returning: true })
            .then((data: [affectedCount: number, affectedRows: PostModel[]]) => {
                const [, posts] = data;
                return posts[0].dataValues;
            });
    }

    async deletePost(ids: number[]): Promise<GetPost[]> {
        const posts: GetPost[] = await this._modelManager.multipleIdExistsCheck(ids);
        await this.postRepository.destroy({ where: { id: ids } });
        return posts;
    }
}
