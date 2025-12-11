"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = notFound;
function notFound(req, res, next) {
    next({
        status: 404,
        message: 'Looks like you got confused, there is nothing here...'
    });
}
