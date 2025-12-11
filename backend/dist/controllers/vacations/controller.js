"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
            const { getSignedImageUrl } = yield Promise.resolve().then(() => __importStar(require('../../aws/aws')));
            let vacations = yield Vacation_1.default.findAll({
                include: [{
                        model: User_1.default,
                        attributes: ["id"],
                        through: { attributes: [] }
                    }
                ]
            });
            // Generate signed URLs for private bucket images
            vacations = yield Promise.all(vacations.map((vacation) => __awaiter(this, void 0, void 0, function* () {
                const vacationData = vacation.toJSON();
                if (vacationData.imageUrl) {
                    try {
                        vacationData.imageUrl = yield getSignedImageUrl(vacationData.imageUrl);
                    }
                    catch (e) {
                        console.error(`Failed to generate signed URL for ${vacationData.imageUrl}:`, e);
                        // Fall back to original URL if signing fails
                    }
                }
                return vacationData;
            })));
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
