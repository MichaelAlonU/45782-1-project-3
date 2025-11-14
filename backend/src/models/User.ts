import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Index, IsEmail, Model, PrimaryKey, Table } from "sequelize-typescript";
import Role from "./Role";
import vacation from "./Vacation";
import Follow from "./Follow";

@Table({
    underscored: true,
})
export default class User extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(30))
    firstName: string

    @AllowNull(false)
    @Column(DataType.STRING(30))
    lastName: string


    @AllowNull(false)
    @Index({ unique: true })
    @IsEmail
    @Column(DataType.STRING)
    email: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Column(DataType.UUID)
    roleId: string

    @BelongsTo(() => Role)
    role: Role

    @BelongsToMany(() => vacation, {
        through: () => Follow,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    followedvacations: vacation[];

}