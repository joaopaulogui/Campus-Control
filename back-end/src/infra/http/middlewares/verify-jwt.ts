import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken"

const publicKey = Buffer.from(process.env.JWT_PUBLIC_KEY!, "base64")

interface UserJwtPayload extends jwt.JwtPayload {
    sub: string,
    role: string
}

export async function VerifyJwt(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const [scheme, token] = authHeader && authHeader.split(' ');

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = jwt.verify(token, publicKey, { algorithms: ["RS256"] },) as UserJwtPayload

    if (typeof payload.sub !== "string" || !payload.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (typeof payload.role !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = { sub: payload.sub, role: payload.role }

    next()
}