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
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
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
const promise_1 = __importDefault(require("mysql2/promise"));
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
function ensureDatabaseExists() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbConfig = config_1.default.get("db");
        console.log("DB HOST:", dbConfig.host);
        console.log("DB USER:", dbConfig.username);
        console.log("DB PASSWORD:", dbConfig.password);
        console.log("DB NAME:", process.env.DB_NAME);
        console.log("DB PORT:", dbConfig.port);
        const connection = yield promise_1.default.createConnection({
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.username,
            password: dbConfig.password
        });
        yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
        yield connection.end();
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ensureDatabaseExists();
        yield sequelize_1.default.sync({
            force: process.argv.includes('force'),
            alter: process.argv.includes('alter')
        });
        yield Role_1.default.bulkCreate([
            { roleName: 'USER' },
            { roleName: 'ADMIN' },
        ], { ignoreDuplicates: true });
        console.log('Roles seeded successfully');
        // Create HTTP server to support both Express and Socket.IO
        const server = http_1.default.createServer(app);
        // Attach Socket.IO to the HTTP server
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: '*'
            }
        });
        // Socket.IO connection handler
        io.on('connection', (socket) => {
            console.log('client connected (socket.io)');
            socket.on('vacation-like', (payload) => {
                io.emit('vacation-like', payload);
            });
            socket.on('disconnect', () => console.log('client disconnected (socket.io)'));
        });
        server.listen(port, () => console.log(`${appName} started on port ${port}`));
    }
    catch (err) {
        console.error("Startup error:", err);
    }
}))();
