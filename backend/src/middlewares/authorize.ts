import { NextFunction, Request, Response } from "express";

export function authorize(requiredRole: string) {
    return (req: Request, res: Response, next: NextFunction) => {
   
    if ((req.user)?.roleName !== requiredRole) {
        return res.status(403).json({ error: "Access denied" });
    }

    next();
};
}
