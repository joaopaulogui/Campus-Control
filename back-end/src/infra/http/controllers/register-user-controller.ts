import { type Request, type Response } from "express";
import { PrismaUsersRepository } from "../../prisma/repositories/prisma-users-repository";
import { RegisterUserUseCase } from "@domain/use-cases/register-user-use-case";
import { BcryptHasher } from "../../cryptography/bcrypt/bcrypt-hasher";
import { registerUserBodySchema } from "../schemas/users";

export class RegisterUserController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const hasher = new BcryptHasher()

        const registerUser = new RegisterUserUseCase(usersRepository, hasher)

        const { name, email, password, role, buildingIds } = registerUserBodySchema.parse(req.body)

        await registerUser.execute({ adminId: req.user!.sub, name, email, password, role, buildingIds })

        res.status(201).send()
    }
}