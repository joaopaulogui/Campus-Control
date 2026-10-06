import { type Request, type Response } from "express"
import { PrismaFloorsRepository } from "../../repositories/prisma/prisma-floors-repository"
import { UpdateFloorUseCase } from "../../use-cases/update-floor-use-case"
import { updateFloorBodySchema, updateFloorParamsSchema } from "../schemas/floors"

export class UpdateFloorController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()

        const updateFloor = new UpdateFloorUseCase(floorsRepository)

        const { floorId } = updateFloorParamsSchema.parse(req.params)
        const { name } = updateFloorBodySchema.parse(req.body)

        await updateFloor.execute({ floorId, name })

        res.status(204).send()
    }
}