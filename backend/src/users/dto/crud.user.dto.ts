import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UserBase {
    @ApiProperty({ example: 'Иван Иваныч', description: 'Имя пользователя' })
    @IsString()
    @MinLength(2)
    @MaxLength(32)
    name: string;

    @ApiProperty({ example: 'test@test.com', description: 'Email пользователя' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ example: false, description: 'Создать суперпользователя' })
    @IsOptional()
    @IsBoolean()
    superuser?: boolean = false;
}

export class CreateUserDTO extends UserBase {
    @ApiProperty({ example: 'qwerty123', description: 'Пароль пользователя' })
    @IsString()
    @MinLength(5)
    @MaxLength(32)
    password: string;
}

export class UpdateUserDTO {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор пользователя' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    id: number;

    @ApiPropertyOptional({ example: 'Иван Иваныч', description: 'Имя пользователя' })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(32)
    name?: string;

    @ApiPropertyOptional({ example: false, description: 'Создать суперпользователя' })
    @IsOptional()
    @IsBoolean()
    superuser?: boolean = false;

    @ApiPropertyOptional({ example: false, description: 'Статус блокировки пользователя' })
    @IsOptional()
    @IsBoolean()
    is_banned?: boolean;

    @ApiPropertyOptional({ example: 'за хулиганство', description: 'Причина блокировки (может быть пустым)' })
    @IsOptional()
    @MaxLength(255)
    ban_reason?: string;
}

export class DeleteUsersDTO {
    @ApiProperty({ example: [1, 2, 3], description: 'Уникальные идентификаторы пользователей' })
    @IsNumber({}, { each: true })
    @IsNotEmpty({ each: true })
    @IsPositive({ each: true })
    ids: number[];
}

export class GetUserDTO extends UserBase {
    @ApiProperty({ example: '2024-02-20T01:23:08.069Z', description: 'Дата регистрации пользователя' })
    createdAt: Date;
    @ApiProperty({ example: '2024-02-20T01:23:08.069Z', description: 'Дата последнего редактирования пользователя' })
    updatedAt: Date;
    @ApiProperty({ example: false, description: 'Статус блокировки пользователя' })
    is_banned: boolean;
    @ApiProperty({ example: 'за хулиганство', description: 'Причина блокировки (может быть пустым)' })
    ban_reason: string;
    @ApiProperty({ example: false, description: 'Суперпользователь' })
    superuser: boolean;
}
