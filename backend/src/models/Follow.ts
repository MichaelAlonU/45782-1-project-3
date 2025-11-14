import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";
import vacation from "./Vacation";

@Table({
    underscored: true
})
export default class Follow extends Model {

    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string

    @PrimaryKey
    @ForeignKey(() => vacation)
    @Column(DataType.UUID)
    vacationId: string
}