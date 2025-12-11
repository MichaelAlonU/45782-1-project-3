"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("config"));
const Role_1 = __importDefault(require("../models/Role"));
const Follow_1 = __importDefault(require("../models/Follow"));
const User_1 = __importDefault(require("../models/User"));
const Vacation_1 = __importDefault(require("../models/Vacation"));
const sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, config_1.default.get('db')), { dialect: 'mysql', models: [Role_1.default, User_1.default, Vacation_1.default, Follow_1.default], logging: console.log }));
exports.default = sequelize;
