import { type Request, type Response } from "express"
import { PrismaFloorsRepository } from "../../prisma/repositories/prisma-floors-repository"
import { ListFloorsUseCase } from "@domain/use-cases/list-floors-use-case"
import { FloorPresenter } from "../presenters/floor-presenter"
import { listFloorsQuerySchema } from "../schemas/floors"
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository"

export class ListFloorsController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const usersRepository = new PrismaUsersRepository()

        const listAllFloors = new ListFloorsUseCase(floorsRepository, usersRepository)

        const { buildingId, name, page, perPage } = listFloorsQuerySchema.parse(req.query)

        const { floors } = await listAllFloors.execute({ userId: req.user!.sub, buildingId, name, page, perPage })

        res.status(200).json(floors.map(FloorPresenter.toHTTP))
    }
}