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
exports.getAll = getAll;
exports.createNewVacation = createNewVacation;
exports.updateVacation = updateVacation;
exports.deleteVacation = deleteVacation;
const Vacation_1 = __importDefault(require("../../models/Vacation"));
const User_1 = __importDefault(require("../../models/User"));
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vacations = yield Vacation_1.default.findAll({
                include: [{
                        model: User_1.default,
                        attributes: ["id"],
                        through: { attributes: [] }
                    }
                ]
            });
            res.json(vacations);
        }
        catch (e) {
            next(e);
        }
    });
}
function createNewVacation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newVacation = yield Vacation_1.default.create(Object.assign(Object.assign({}, req.body), { imageUrl: req.imageUrl }));
            res.json(newVacation);
        }
        catch (e) {
            next(e);
        }
    });
}
function updateVacation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Update vacation controller reached, req.body:", req.body, req.params);
            const vacation = yield Vacation_1.default.findByPk(req.params.id);
            if (!vacation)
                return next({
                    status: 404,
                    message: 'no vacation was found'
                });
            const { destination, description, startTime, endTime, price } = req.body;
            vacation.destination = destination;
            vacation.description = description;
            vacation.startTime = startTime;
            vacation.endTime = endTime;
            vacation.price = price;
            console.log(`req imageurl   `, req.imageUrl, `     ===req body image url`, req.body.imageUrl);
            if (req.imageUrl) {
                vacation.imageUrl = req.imageUrl;
            }
            yield vacation.save();
            res.json(vacation);
        }
        catch (e) {
            next(e);
        }
    });
}
function deleteVacation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedRows = yield Vacation_1.default.destroy({ where: { id } });
            if (deletedRows === 0)
                return next({
                    status: 404,
                    message: 'No vacation was found'
                });
            res.json({ success: true });
        }
        catch (e) {
            next(e);
        }
    });
}
