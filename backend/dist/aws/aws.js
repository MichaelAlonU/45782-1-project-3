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
exports.createAppBucketIfNotExists = createAppBucketIfNotExists;
exports.getSignedImageUrl = getSignedImageUrl;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = __importDefault(require("config"));
const s3Connection = JSON.parse(JSON.stringify(config_1.default.get('s3.connection')));
if (!config_1.default.get(`s3.isLocalStack`))
    delete s3Connection.endpoint;
const s3Client = new client_s3_1.S3Client(s3Connection);
function createAppBucketIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield s3Client.send(new client_s3_1.CreateBucketCommand({
                Bucket: config_1.default.get('s3.bucket')
            }));
            console.log(`Created S3 bucket! ==>`);
            console.log(result);
        }
        catch (e) {
            console.log('bucket creation failed. silenting exception, bucket probably already exists', e);
        }
    });
}
/**
 * Generate a signed URL for reading a private S3 object.
 * @param key - The object key (path) in the S3 bucket
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 */
function getSignedImageUrl(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, expiresIn = 360000) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: config_1.default.get('s3.bucket'),
                Key: key
            });
            const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn });
            return signedUrl;
        }
        catch (e) {
            console.error('Failed to generate signed URL:', e);
            throw e;
        }
    });
}
exports.default = s3Client;
