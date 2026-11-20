import { type Request, type Response } from "express";
import { PrismaUsersRepository } from "../../prisma/repositories/prisma-users-repository";
import { DeleteUserUseCase } from "@domain/use-cases/delete-user-use-case";
import { deleteUserParamsSchema } from "../schemas/users";

export class DeleteUserController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()

        const deleteUser = new DeleteUserUseCase(usersRepository)

        const { userId } = deleteUserParamsSchema.parse(req.params)

        await deleteUser.execute({ adminId: req.user!.sub, userId })

        res.status(204).send()
    }
}