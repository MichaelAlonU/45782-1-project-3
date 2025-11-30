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
exports.testUpload = testUpload;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const config_1 = __importDefault(require("config"));
const s3Connection = JSON.parse(JSON.stringify(config_1.default.get('s3.connection')));
const s3Client = new client_s3_1.S3Client(s3Connection);
if (!config_1.default.get(`s3.isLocalStack`))
    delete s3Connection.endpoint;
console.log(`im here! bucketttttttttttttttttttt`);
function createAppBucketIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`Created S3 bucket!`);
            const result = yield s3Client.send(new client_s3_1.CreateBucketCommand({
                Bucket: config_1.default.get('s3.bucket')
            }));
            console.log(result);
        }
        catch (e) {
            console.log('bucket creation failed. silenting exception, bucket probably already exists', e);
        }
    });
}
function testUpload() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const upload = new lib_storage_1.Upload({
                client: s3Client,
                params: {
                    Bucket: config_1.default.get('s3.bucket'),
                    Key: 'test.txt',
                    ContentType: 'text/plain',
                    Body: 'hello world, localstack seems to work'
                }
            });
            const result = yield upload.done();
            console.log('upload result:', result);
        }
        catch (e) {
            console.log('exception in test upload: ', e);
        }
    });
}
exports.default = s3Client;
