"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_1 = require("../middlewares/authorize");
const validation_1 = __importDefault(require("../middlewares/validation"));
const validator_1 = require("../controllers/vacations/validator");
const controller_1 = require("../controllers/vacations/controller");
const file_uploader_1 = __importDefault(require("../middlewares/file-uploader"));
const file_validation_1 = __importDefault(require("../middlewares/file-validation"));
// import { createMeet, /*filterByMaxPrice,*/ filterByTeam } from "../controllers/meeting/controller";
// import { createMeetValidator, meetingsByTeamIdValidator } from "../controllers/meeting/validator";
// import paramValidation from "../middlewares/param-validation";
const router = (0, express_1.Router)();
// router.get('/by-team/:teamId', paramValidation(meetingsByTeamIdValidator) , filterByTeam)
router.get('/', controller_1.getAll);
router.post('/', (0, authorize_1.authorize)(`ADMIN`), (0, file_validation_1.default)(validator_1.newVacationImageValidator), file_uploader_1.default, (0, validation_1.default)(validator_1.createNewVacationValidator), controller_1.createNewVacation);
router.patch('/:id', (0, authorize_1.authorize)(`ADMIN`), (0, file_validation_1.default)(validator_1.updateVacationImageValidator), file_uploader_1.default, (0, validation_1.default)(validator_1.updateVacationValidator), controller_1.updateVacation);
router.delete('/:id', (0, authorize_1.authorize)(`ADMIN`), controller_1.deleteVacation);
exports.default = router;
