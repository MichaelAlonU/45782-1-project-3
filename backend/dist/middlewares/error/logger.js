"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;
function logger(err, req, res, next) {
    console.error(err);
    next(err);
}
