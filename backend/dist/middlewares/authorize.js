"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
function authorize(requiredRole) {
    return (req, res, next) => {
        var _a;
        if (((_a = (req.user)) === null || _a === void 0 ? void 0 : _a.roleName) !== requiredRole) {
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    };
}
