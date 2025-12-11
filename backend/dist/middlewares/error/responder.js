"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = responder;
function responder(err, req, res, next) {
    res.status(err.status || 500).send(err.message || 'internal server error...');
}
