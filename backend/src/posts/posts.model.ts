import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({ tableName: 'post' })
export class PostModel extends Model<PostModel> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING(64), allowNull: false })
    title: string;

    @Column({ type: DataType.TEXT, allowNull: true, defaultValue: '' })
    text: string;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createdAt: Date;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    updatedAt: Date;

    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
