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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fileValidation;
function fileValidation(validator) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log("Validating pic with fileVal middleware, req.files: ", req.files);
                // If there are no uploaded files, skip validation (optional image)
                const files = ((_a = req.files) !== null && _a !== void 0 ? _a : {});
                if (!files) {
                    console.log("No files uploaded - skipping file validation");
                    return next();
                }
                const validated = yield validator.validateAsync(files);
                // assign back the validated object (may be useful downstream)
                req.files = validated;
                console.log("Validating pic with fileVal middleware ended successfully");
                next();
            }
            catch (e) {
                next({
                    status: 422,
                    message: e.message
                });
            }
        });
    };
}
