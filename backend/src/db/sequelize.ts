import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Role from "../models/Role";
import Follow from "../models/Follow";
import User from "../models/User";
import Vacation from "../models/Vacation";


const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [Role, User, Vacation, Follow],
    logging: console.log
})

export default sequelize