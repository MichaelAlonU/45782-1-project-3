"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticate;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("config"));
function authenticate(req, res, next) {
    const jwtSecret = config_1.default.get('app.jwtSecret');
    const authHeader = req.get('Authorization');
    if (!authHeader)
        return next({
            status: 401,
            message: 'missing Authorization header'
        });
    if (!authHeader.startsWith('Bearer'))
        return next({
            status: 401,
            message: 'missing Bearer keyword'
        });
    const parts = authHeader.split(' ');
    const jwt = parts[1];
    if (!jwt)
        return next({
            status: 401,
            message: 'missing jwt'
        });
    try {
        const user = (0, jsonwebtoken_1.verify)(jwt, jwtSecret);
        req.user = user;
        console.log(`========From athenticate middleware user: ==========`);
        console.log(user);
        console.log(`========From athenticate middleware req.files: ==========`);
        console.log(req.files);
        next();
    }
    catch (e) {
        next({
            status: 401,
            message: 'invalid jwt'
        });
    }
}
