import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { PostModel } from '../posts/posts.model';

interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
    superuser?: boolean;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    is_banned: boolean;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createdAt: Date;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    updatedAt: Date;

    @Column({ type: DataType.STRING(255) })
    ban_reason: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    superuser: boolean;

    @HasMany(() => PostModel, { onDelete: 'SET NULL' })
    posts: PostModel[];
}
