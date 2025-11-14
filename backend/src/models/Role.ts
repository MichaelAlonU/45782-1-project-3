import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";

@Table({
    underscored: true
})
export default class Role extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true
    })
    roleName: string

    @HasMany(() => User, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    users: User[]

}