import { type Request, type Response, type NextFunction } from "express";
import "dotenv/config"
import jwt from "jsonwebtoken"

interface UserJwtPayload extends jwt.JwtPayload {
    sub: string,
    role: string
}

export async function VerifyUserRole(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader!.split(' ')[1];

    const bufferPublicKey = Buffer.from(process.env.JWT_PUBLIC_KEY!, "base64")
    
    const decoded = jwt.verify(token!, bufferPublicKey, { algorithms: ["RS256"] },) as UserJwtPayload

    if(!decoded.role || decoded.role !== "ADMIN") {
        throw new Error()
    }

    next()
}