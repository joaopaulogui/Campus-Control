import { type Request, type Response } from "express"
import { PrismaBuildingsRepository } from "../../repositories/prisma/prisma-buildings-repository"
import { UpdateBuildingUseCase } from "../../use-cases/update-building-use-case"
import { updateBuildingBodySchema, updateBuildingParamsSchema } from "../schemas/buildings"

export class UpdateBuildingController {
    async handle(req: Request, res: Response) {
        const buildingsRepository = new PrismaBuildingsRepository()

        const updateBuilding = new UpdateBuildingUseCase(buildingsRepository)

        const { buildingId } = updateBuildingParamsSchema.parse(req.params)
        const { name } = updateBuildingBodySchema.parse(req.body)

        await updateBuilding.execute({ buildingId, name })

        res.status(204).send()
    }
}