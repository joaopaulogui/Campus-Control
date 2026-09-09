import { type Request, type Response } from "express";
import { PrismaBuildingsRepository } from "../../repositories/prisma/prisma-buildings-repository";
import { ListBuildingsUseCase } from "../../use-cases/list-buildings-use-case";
import { BuildingPresenter } from "../presenters/building-presenter";

export class ListBuildingsController {
    async handle(req: Request, res: Response) {
        const buildingsRepository = new PrismaBuildingsRepository()

        const listBuildings = new ListBuildingsUseCase(buildingsRepository)

        const { buildings } = await listBuildings.execute()

        res.status(200).json(buildings.map(BuildingPresenter.toHTTP))
    }
}