import { type Request, type Response, type NextFunction } from "express";
import "dotenv/config"
import jwt from "jsonwebtoken"

interface UserJwtPayload extends jwt.JwtPayload {
    sub: string,
    role: string
}

export function VerifyUserRole(req: Request, res: Response, next: NextFunction) {
    if(!req.user) {
        return res.status(401).send({ message: "Unauthorized" })
    }

    if(req.user.role !== "ADMIN") {
        return res.status(403).send({ message: "Forbidden" })
    }

    next()
}