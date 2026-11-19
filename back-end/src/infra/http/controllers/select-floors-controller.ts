import { type Request, type Response } from "express"
import { PrismaFloorsRepository } from "../../prisma/repositories/prisma-floors-repository"
import { SelectFloorsUseCase } from "@domain/use-cases/select-floors-use-case"
import { FloorPresenter } from "../presenters/floor-presenter"
import { listFloorsQuerySchema } from "../schemas/floors"
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository"

export class SelectFloorsController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const floorsRepository = new PrismaFloorsRepository()

        const selectAllFloors = new SelectFloorsUseCase(floorsRepository, usersRepository)

        const { buildingId, name, page, perPage } = listFloorsQuerySchema.parse(req.query)

        const { floors } = await selectAllFloors.execute({ userId: req.user!.sub, buildingId, name, page, perPage })

        res.status(200).json(floors.map(FloorPresenter.toSelect))
    }
}