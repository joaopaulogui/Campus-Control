import { type Request, type Response } from "express";
import { PrismaBuildingsRepository } from "../../repositories/prisma/prisma-buildings-repository";
import { DeleteBuildingUseCase } from "../../use-cases/delete-building-use-case";
import { deleteBuildingParamsSchema } from "../schemas/buildings";

export class DeleteBuildingController {
    async handle(req: Request, res: Response) {
        const buildingsRepository = new PrismaBuildingsRepository()

        const deleteBuilding = new DeleteBuildingUseCase(buildingsRepository)

        const { buildingId } = deleteBuildingParamsSchema.parse(req.params)

        await deleteBuilding.execute({ buildingId })

        res.status(204).send()
    }
}