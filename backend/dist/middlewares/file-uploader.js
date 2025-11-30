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
exports.default = fileUploader;
const lib_storage_1 = require("@aws-sdk/lib-storage");
const aws_1 = __importStar(require("../aws/aws"));
const config_1 = __importDefault(require("config"));
const crypto_1 = require("crypto");
const path_1 = require("path");
const url_1 = require("url");
function fileUploader(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("=== HEADERS ===");
        console.log(req.headers);
        console.log("=== CONTENT-TYPE ===");
        console.log(req.headers['content-type']);
        console.log("=== METHOD & URL ===");
        console.log("method: ", req.method, "URL:", req.url);
        console.log(`=======body :  ========`);
        console.log(req.body);
        console.log(`=======req files:  ========`);
        console.log(req.files);
        if (!req.files)
            return next();
        if (!req.files.image)
            return next();
        console.log(`req files:  `, req.files);
        const { mimetype, data, name } = req.files.image;
        try {
            yield (0, aws_1.createAppBucketIfNotExists)();
        }
        catch (e) {
            console.error("Bucket creation failed:", e);
            return next(e);
        }
        const upload = new lib_storage_1.Upload({
            client: aws_1.default,
            params: {
                Bucket: config_1.default.get('s3.bucket'),
                Key: `${(0, crypto_1.randomUUID)()}${(0, path_1.extname)(name)}`,
                ContentType: mimetype,
                Body: data
            }
        });
        const result = yield upload.done();
        const url = new url_1.URL(result.Location);
        req.imageUrl = url.pathname;
        next();
    });
}
