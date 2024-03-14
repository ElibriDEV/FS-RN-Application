import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from './dto/crud.user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

    async getUserById(id: number): Promise<User> {
        const userExists: User = await this.userRepository.findOne({ where: { id } });
        if (!userExists) {
            throw new HttpException(`Пользователь с id ${id} не существует.`, HttpStatus.NOT_FOUND);
        }
        return userExists;
    }

    private async _usersIdExistsCheck(usersIds: number[]): Promise<User[]> {
        const users: User[] = await this.userRepository.findAll({
            where: { id: usersIds },
        });
        if (users.length !== usersIds.length) {
            users.forEach((user: User): void => {
                const index: number = usersIds.indexOf(user.id);
                usersIds.splice(index, 1);
            });
            throw new HttpException(`Пользователь(-и) с id ${usersIds} не существует(-ют).`, HttpStatus.NOT_FOUND);
        }
        return users;
    }

    async getUsers(): Promise<GetUserDTO[]> {
        const users: GetUserDTO[] = await this.userRepository.findAll().then((users: User[]) => {
            return users.map((user: User) => {
                const { password, ...userData } = user.dataValues;
                return userData;
            });
        });
        if (users.length == 0) {
            throw new HttpException('Пользователи не найдены', HttpStatus.NOT_FOUND);
        }
        return users;
    }

    async createUser(dto: CreateUserDTO): Promise<GetUserDTO> {
        const userExists: User | null = await this.userRepository.findOne({ where: { email: dto.email } });
        if (userExists) {
            throw new HttpException(`Пользователь с Email ${dto.email} уже существует`, HttpStatus.CONFLICT);
        }
        const passwordHash: string = await bcrypt.hash(dto.password, 5);
        return await this.userRepository.create({ password: passwordHash, ...dto }).then((user) => {
            const { password, ...userData } = user.dataValues;
            return userData;
        });
    }

    async updateUser(dto: UpdateUserDTO): Promise<GetUserDTO> {
        const { id, ...dtoData } = dto;
        await this.getUserById(id);
        const [, user] = await this.userRepository.update(dtoData, { where: { id }, returning: true });
        const { password, ...userData } = user[0].dataValues;
        return userData;
    }

    async deleteUsers(ids: number[]): Promise<GetUserDTO[]> {
        const users: GetUserDTO[] = await this._usersIdExistsCheck(ids).then((users: User[]) => {
            return users.map((user: User) => {
                const { password, ...userData } = user.dataValues;
                return userData;
            });
        });
        await this.userRepository.destroy({ where: { id: ids } });
        return users;
    }
}
