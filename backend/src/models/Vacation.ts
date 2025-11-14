import { AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";
import Follow from "./Follow";

@Table({
    underscored: true,
})
export default class Vacation extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    destination: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(false)
    @Column(DataType.DATE)
    startTime: Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    endTime: Date;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    price: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    imageUrl: string

    @BelongsToMany(() => User, () => Follow)
    followers: User[];

}