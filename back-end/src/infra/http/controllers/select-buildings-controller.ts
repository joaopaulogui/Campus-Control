import { type Request, type Response } from "express";
import { PrismaBuildingsRepository } from "../../prisma/repositories/prisma-buildings-repository";
import { ListBuildingsUseCase } from "@domain/use-cases/list-buildings-use-case";
import { BuildingPresenter } from "../presenters/building-presenter";
import { listBuildingsQuerySchema } from "../schemas/buildings";
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository";

export class SelectBuildingsController {
    async handle(req: Request, res: Response) {
        const buildingsRepository = new PrismaBuildingsRepository()
        const usersRepository = new PrismaUsersRepository()

        const listBuildings = new ListBuildingsUseCase(buildingsRepository, usersRepository)

        const { name, page, perPage } = listBuildingsQuerySchema.parse(req.query)

        const { buildings } = await listBuildings.execute({ userId: req.user!.sub, name, page, perPage })

        res.status(200).json(buildings.map(BuildingPresenter.toSelect))
    }
}