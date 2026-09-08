import { type Request, type Response } from "express";
import { z } from "zod";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { BcryptHasher } from "../cryptography/bcrypt/bcrypt-hasher";
import { JwtEncrypter } from "../cryptography/jwt/jwt-encrypter";
import "dotenv/config"
import { AuthenticateUserUseCase } from "../use-cases/authenticate-user-use-case";

const AuthenticateUserBodySchema = z.object({
    email: z.email(),
    password: z.string(),
})

export class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const hasher = new BcryptHasher()
        const encrypter = new JwtEncrypter(process.env.JWT_PRIVATE_KEY!, {})

        const authenticateUser = new AuthenticateUserUseCase(usersRepository, hasher, encrypter)

        const { email, password } = AuthenticateUserBodySchema.parse(req.body)

        const result = await authenticateUser.execute({ email, password })

        res.status(201).json(result)
    }
}