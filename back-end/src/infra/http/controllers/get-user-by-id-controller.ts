import { GetUserByIdUseCase } from "@/domain/use-cases/get-user-by-id-use-case";
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository";
import { type Request, type Response } from "express";
import { getUserByIdParamsSchema } from "../schemas/users";
import { UserPresenter } from "../presenters/user-presenter";

export class GetUserByIdController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()

        const getUserById = new GetUserByIdUseCase(usersRepository)

        const { userId } = getUserByIdParamsSchema.parse(req.params)

        const { user } = await getUserById.execute({ userId })

        res.status(200).json(UserPresenter.toHttpWithBuildingIds(user))
    }
}