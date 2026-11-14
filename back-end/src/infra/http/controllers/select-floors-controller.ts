import { type Request, type Response } from "express"
import { PrismaFloorsRepository } from "../../prisma/repositories/prisma-floors-repository"
import { ListFloorsUseCase } from "@domain/use-cases/list-floors-use-case"
import { FloorPresenter } from "../presenters/floor-presenter"
import { listFloorsQuerySchema } from "../schemas/floors"

export class SelectFloorsController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()

        const listAllFloors = new ListFloorsUseCase(floorsRepository)

        const { buildingId, name, page, perPage } = listFloorsQuerySchema.parse(req.query)

        const { floors } = await listAllFloors.execute({ buildingId, name, page, perPage })

        res.status(200).json(floors.map(FloorPresenter.toSelect))
    }
}