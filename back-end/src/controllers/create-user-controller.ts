import { type Request, type Response } from "express";
import { z } from "zod";
import { UserRole } from "../entities/user";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";

const CreateUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(UserRole)
})

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()

        const createUser = new CreateUserUseCase(usersRepository)

        const { name, email, password, role } = CreateUserBodySchema.parse(req.body)

        await createUser.execute({ name, email, password, role })

        res.status(201).send()
    }
}