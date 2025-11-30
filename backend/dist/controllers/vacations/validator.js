"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVacationImageValidator = exports.updateVacationValidator = exports.newVacationImageValidator = exports.createNewVacationValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createNewVacationValidator = joi_1.default.object({
    destination: joi_1.default.string().min(3).max(40).required(),
    description: joi_1.default.string().min(20).required(),
    startTime: joi_1.default.date().required().min('now'),
    endTime: joi_1.default.date().required().min(joi_1.default.ref('startTime')),
    price: joi_1.default.number().min(1).max(10000).required(),
    // image: Joi.object()
}).unknown(true);
exports.newVacationImageValidator = joi_1.default.object({
    // image: Joi.object({
    //     mimetype: Joi.string().valid('image/jpeg', 'image/png')
    // }).unknown(true).required()
    image: joi_1.default.object({
        mimetype: joi_1.default.string()
            .valid('image/jpeg', 'image/png')
            .required()
            .messages({
            'any.only': 'Image must be a JPEG or PNG file',
            'any.required': 'Image is required!',
        }),
    }).unknown(true)
        .required()
        .messages({
        'any.required': 'Image is required!!!',
    }),
});
exports.updateVacationValidator = joi_1.default.object({
    destination: joi_1.default.string().min(3).max(40).required(),
    description: joi_1.default.string().min(20).required(),
    startTime: joi_1.default.date().required(),
    endTime: joi_1.default.date().required().min(joi_1.default.ref('startTime')),
    price: joi_1.default.number().min(1).max(10000).required(),
    image: joi_1.default.any().optional()
});
exports.updateVacationImageValidator = joi_1.default.object({
    // image: Joi.object({
    //     mimetype: Joi.string().valid('image/jpeg', 'image/png')
    // }).unknown(true).required()
    image: joi_1.default.object({
        mimetype: joi_1.default.string()
            .valid('image/jpeg', 'image/png')
            .messages({
            'any.only': 'Image must be a JPEG or PNG file',
        }),
    }).unknown(true).optional()
});
