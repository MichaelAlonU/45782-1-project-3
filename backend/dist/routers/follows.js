"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const param_validation_1 = __importDefault(require("../middlewares/param-validation"));
const validator_1 = require("../controllers/follows/validator");
const controller_1 = require("../controllers/follows/controller");
const router = (0, express_1.Router)();
router.post('/follow/:vacationId', (0, param_validation_1.default)(validator_1.followValidator), controller_1.follow);
router.delete('/unfollow/:vacationId', (0, param_validation_1.default)(validator_1.unfollowValidator), controller_1.unfollow);
exports.default = router;
