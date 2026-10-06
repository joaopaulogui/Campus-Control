import { type Request, type Response } from "express";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../../use-cases/register-user-use-case";
import { BcryptHasher } from "../../cryptography/bcrypt/bcrypt-hasher";
import { registerUserBodySchema } from "../schemas/users";

export class RegisterUserController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const hasher = new BcryptHasher()

        const registerUser = new RegisterUserUseCase(usersRepository, hasher)

        const { name, email, password, role } = registerUserBodySchema.parse(req.body)

        await registerUser.execute({ name, email, password, role })

        res.status(201).send()
    }
}