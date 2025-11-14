import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import config from 'config'
import { createHmac } from "crypto";
import { sign } from "jsonwebtoken";
import Role from "../../models/Role";

function hashAndSaltPassword(plainTextPassword: string): string {
    const secret = config.get<string>('app.secret')
    return createHmac('sha256', secret).update(plainTextPassword).digest('hex')
}

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const jwtSecret = config.get<string>('app.jwtSecret')

        req.body.password = hashAndSaltPassword(req.body.password)
        req.body.email = req.body.email.trim().toLowerCase();
        const userRole = await Role.findOne({ where: { roleName: "USER" } });
        req.body.roleId = userRole.id;

        const user = await User.create(req.body)
        const plainData = user.get({ plain: true })
        delete plainData.password
        const tokenPayload = {
            id: plainData.id,
            firstName: plainData.firstName,
            email: plainData.email,
            roleName: plainData.role?.roleName
        };
        const jwt = sign(tokenPayload, jwtSecret);
        res.json({ jwt })
    } catch (e) {
        next(e)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const jwtSecret = config.get<string>('app.jwtSecret')

        req.body.email = req.body.email.trim().toLowerCase();
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: hashAndSaltPassword(req.body.password)
            },
            include: [Role]
        })
        if (!user) throw new Error('invalid email and/or password')
        const plainData = user.get({ plain: true })
        delete plainData.password
        const tokenPayload = {
            id: plainData.id,
            firstName: plainData.firstName,
            email: plainData.email,
            roleName: plainData.role?.roleName
        };
        const jwt = sign(tokenPayload, jwtSecret);
        res.json({ jwt })
    } catch (e) {
        if (e.message === 'invalid email and/or password') return next({
            status: 401,
            message: 'invalid email and/or password'
        })
        next(e)
    }
}
