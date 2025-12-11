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
exports.default = fileUploader;
const lib_storage_1 = require("@aws-sdk/lib-storage");
const aws_1 = __importDefault(require("../aws/aws"));
const config_1 = __importDefault(require("config"));
const crypto_1 = require("crypto");
const path_1 = require("path");
const url_1 = require("url");
function fileUploader(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.files)
            return next();
        if (!req.files.image)
            return next();
        console.log(`req files:  `, req.files);
        const { mimetype, data, name } = req.files.image;
        try {
            // await createAppBucketIfNotExists();
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
