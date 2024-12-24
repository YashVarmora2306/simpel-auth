import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/ResponseHandler";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.config";

export interface CustomRequest extends Request {
    user?: {
        id: string;
        name: string;
        email: string
    } | null;
}

interface JwtPayload {
    id: string;
}

const authUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            ResponseHandler.error(res, 401, false, "Not authorized, token missing")
            return
        }

        const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`) as JwtPayload

        const user = await prisma.user.findFirst({
            where: {
                id: decoded.id
            }, select: {
                id: true,
                name: true,
                email: true,
            }
        })

        req.user = user
        next()
    } catch (error) {
        ResponseHandler.error(res, 401, false, "Not authorized, token failed")
    }
}

export default authUser;