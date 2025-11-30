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
const express_1 = __importStar(require("express"));
const logger_1 = __importDefault(require("./middlewares/error/logger"));
const responder_1 = __importDefault(require("./middlewares/error/responder"));
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const config_1 = __importDefault(require("config"));
const sequelize_1 = __importDefault(require("./db/sequelize"));
const Role_1 = __importDefault(require("./models/Role"));
const cors_1 = __importDefault(require("cors"));
const vacations_1 = __importDefault(require("./routers/vacations"));
const follows_1 = __importDefault(require("./routers/follows"));
const auth_1 = __importDefault(require("./routers/auth"));
const authenticate_1 = __importDefault(require("./middlewares/authenticate"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
const port = config_1.default.get('app.port');
const appName = config_1.default.get('app.name');
const secret = config_1.default.get('app.secret');
console.log(`app secret is ${secret}`);
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.use((0, express_1.json)());
app.use('/auth', auth_1.default);
app.use(authenticate_1.default);
app.use('/vacations', vacations_1.default);
app.use('/followers', follows_1.default);
// not found
app.use(not_found_1.default);
// error middlewares
app.use(logger_1.default);
app.use(responder_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.default.sync({ force: process.argv[2] === 'force', alter: process.argv[2] === 'alter' });
    yield Role_1.default.bulkCreate([
        { roleName: 'USER' },
        { roleName: 'ADMIN' },
    ], { ignoreDuplicates: true });
    console.log('Roles seeded successfully');
    app.listen(port, () => console.log(`${appName} started on port ${port}`));
}))();
console.log(process.argv);
