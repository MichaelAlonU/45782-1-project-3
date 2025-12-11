"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
const User_1 = __importDefault(require("../../models/User"));
const config_1 = __importDefault(require("config"));
const crypto_1 = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
const Role_1 = __importDefault(require("../../models/Role"));
function hashAndSaltPassword(plainTextPassword) {
    const secret = config_1.default.get('app.secret');
    return (0, crypto_1.createHmac)('sha256', secret).update(plainTextPassword).digest('hex');
}
function makeJwt(user) {
    var _a;
    const jwtSecret = config_1.default.get('app.jwtSecret');
    const plainData = user.get({ plain: true });
    // delete plainData.password
    const tokenPayload = {
        id: plainData.id,
        firstName: plainData.firstName,
        lastName: plainData.lastName,
        email: plainData.email,
        roleName: (_a = plainData.role) === null || _a === void 0 ? void 0 : _a.roleName
    };
    const jwt = (0, jsonwebtoken_1.sign)(tokenPayload, jwtSecret);
    return jwt;
}
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.body.password = hashAndSaltPassword(req.body.password);
            req.body.email = req.body.email.trim().toLowerCase();
            const existingEmail = yield User_1.default.findOne({
                where: {
                    email: req.body.email,
                }
            });
            if (existingEmail)
                throw new Error('email already in use');
            const userRole = yield Role_1.default.findOne({ where: { roleName: "USER" } });
            req.body.roleId = userRole.id;
            const user = yield User_1.default.create(req.body);
            const jwt = makeJwt(user);
            res.json({ jwt });
        }
        catch (e) {
            if (e.message === 'email already in use')
                return next({
                    status: 400,
                    message: 'email already in use'
                });
            next(e);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.body.email = req.body.email.trim().toLowerCase();
            const user = yield User_1.default.findOne({
                where: {
                    email: req.body.email,
                    password: hashAndSaltPassword(req.body.password)
                },
                include: [Role_1.default]
            });
            if (!user)
                throw new Error('invalid email and/or password');
            const jwt = makeJwt(user);
            res.json({ jwt });
        }
        catch (e) {
            if (e.message === 'invalid email and/or password')
                return next({
                    status: 401,
                    message: 'invalid email and/or password'
                });
            next(e);
        }
    });
}
