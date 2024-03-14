import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, MaxLength, MinLength } from 'class-validator';
import {Transform, Type} from "class-transformer";

export class GetPostByUserId {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор пользователя' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    userId: number;
}

export class PostBase extends GetPostByUserId {
    @ApiProperty({ example: 'Новая задача', description: 'Заголовок задачи' })
    @MinLength(1)
    @MaxLength(64)
    title: string;

    @ApiPropertyOptional({ example: 'Посидеть-побалдеть', description: 'Содержание задачи' })
    @IsOptional()
    text?: string = '';

    @ApiProperty({ example: '2024-02-20T01:23:08.069Z', description: 'Дата регистрации пользователя' })
    createdAt: Date;

    @ApiProperty({ example: '2024-02-20T01:23:08.069Z', description: 'Дата последнего редактирования пользователя' })
    updatedAt: Date;
}

export class UpdatePost {
    @ApiPropertyOptional({ example: 1, description: 'Уникальный идентификатор пользователя' })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    userId?: number;

    @ApiPropertyOptional({ example: 'Новая задача', description: 'Заголовок задачи' })
    @IsOptional()
    @MinLength(1)
    @MaxLength(64)
    title?: string;

    @ApiPropertyOptional({ example: 'Посидеть-побалдеть', description: 'Содержание задачи' })
    @IsOptional()
    text?: string = '';
}

export class GetPost extends PostBase {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор задачи' })
    id: number;
}

export class Pagination {
    @ApiProperty({ example: 1, description: 'Текущая страница' })
    @IsNumber()
    @Transform(({value}) => parseInt(value, 10), { toClassOnly: true })
    page: number

    @ApiProperty({ example: 10, description: 'Количество элементов на странице' })
    @IsNumber()
    @Transform(({value}) => parseInt(value, 10), { toClassOnly: true })
    perPage: number
}
