import { type Request, type Response } from "express";
import { PrismaBuildingsRepository } from "../../repositories/prisma/prisma-buildings-repository";
import { ListBuildingsUseCase } from "../../use-cases/list-buildings-use-case";
import { BuildingPresenter } from "../presenters/building-presenter";
import { listBuildingsQuerySchema } from "../schemas/buildings";

export class SelectBuildingsController {
    async handle(req: Request, res: Response) {
        const buildingsRepository = new PrismaBuildingsRepository()

        const listBuildings = new ListBuildingsUseCase(buildingsRepository)

        const { name, page, perPage } = listBuildingsQuerySchema.parse(req.query)

        const { buildings } = await listBuildings.execute({ name, page, perPage })

        res.status(200).json(buildings.map(BuildingPresenter.toSelect))
    }
}