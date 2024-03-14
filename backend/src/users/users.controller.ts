import { Body, Controller, Delete, Get, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, DeleteUsersDTO, GetUserDTO, UpdateUserDTO } from './dto/crud.user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiOkResponse({ type: [GetUserDTO] })
    @Get('/all')
    async getUsers(): Promise<GetUserDTO[]> {
        return await this.usersService.getUsers();
    }

    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiOkResponse({ type: GetUserDTO })
    @Post('/create')
    async createUser(@Body() dto: CreateUserDTO): Promise<GetUserDTO> {
        return await this.usersService.createUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Обновление пользователя' })
    @ApiOkResponse({ type: GetUserDTO })
    @Patch('/update/:id')
    async updateUser(@Body() dto: UpdateUserDTO): Promise<GetUserDTO> {
        return await this.usersService.updateUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Удаление пользователя(-ей)' })
    @ApiOkResponse({ type: [GetUserDTO] })
    @Delete('/delete')
    async deleteUsers(@Body() dto: DeleteUsersDTO): Promise<GetUserDTO[]> {
        return await this.usersService.deleteUsers(dto.ids);
    }
}
