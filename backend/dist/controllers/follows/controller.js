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
exports.follow = follow;
exports.unfollow = unfollow;
const Follow_1 = __importDefault(require("../../models/Follow"));
const Vacation_1 = __importDefault(require("../../models/Vacation"));
const User_1 = __importDefault(require("../../models/User"));
// import socket from "../../io/io";
// import SocketMessages from "socket-enums-shaharsolllllll";
function follow(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.id;
            const vacationId = req.params.vacationId;
            const existing = yield Follow_1.default.findOne({
                where: {
                    userId,
                    vacationId
                }
            });
            if (existing)
                throw new Error('follow already exists');
            yield Follow_1.default.create({ userId, vacationId });
            const vacation = yield Vacation_1.default.findByPk(vacationId, {
                include: [{
                        model: User_1.default,
                        attributes: ["id"],
                        through: { attributes: [] }
                    }]
            });
            res.json(vacation);
            // socket.emit(SocketMessages.NewFollow, {
            //     from: req.get('x-client-id'),
            //     followee,
            //     follower
            // })
        }
        catch (e) {
            if (e.message === 'follow already exists')
                return next({
                    status: 422,
                    message: e.message
                });
            next(e);
        }
    });
}
function unfollow(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.id;
            const vacationId = req.params.vacationId;
            const follow = yield Follow_1.default.findOne({ where: { userId, vacationId } });
            if (!follow)
                throw new Error('the user is not following this vacation');
            yield follow.destroy();
            const vacation = yield Vacation_1.default.findByPk(vacationId, {
                include: [{
                        model: User_1.default,
                        attributes: ["id"],
                        through: { attributes: [] }
                    }]
            });
            res.json(vacation);
        }
        catch (e) {
            console.log(e);
            if (e.message === 'the user is not following this vacation')
                return next({
                    status: 422,
                    message: 'the user is not following this vacation'
                });
            next(e);
        }
    });
}
