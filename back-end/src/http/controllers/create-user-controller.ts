import { type Request, type Response } from "express";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../../use-cases/create-user-use-case";
import { BcryptHasher } from "../../cryptography/bcrypt/bcrypt-hasher";
import { createUserBodySchema } from "../schemas/users";

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const hasher = new BcryptHasher()

        const createUser = new CreateUserUseCase(usersRepository, hasher)

        const { name, email, password, role } = createUserBodySchema.parse(req.body)

        await createUser.execute({ name, email, password, role })

        res.status(201).send()
    }
}