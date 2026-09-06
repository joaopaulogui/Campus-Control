import { type Request, type Response } from "express"
import { PrismaFloorsRepository } from "../repositories/prisma/prisma-floors-repository"
import { ListFloorsUseCase } from "../use-cases/list-floors-use-case"
import { FloorPresenter } from "../presenters/floor-presenter"
import { z } from "zod"

const ListFloorsQuerySchema = z.object({
    buildingId: z.uuid().optional()
})

export class ListFloorsController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()

        const listAllFloors = new ListFloorsUseCase(floorsRepository)

        const { buildingId } = ListFloorsQuerySchema.parse(req.query)

        const { floors } = await listAllFloors.execute({ buildingId, })

        res.status(200).json(floors.map(FloorPresenter.toHTTP))
    }
}