import { GetBuildingByIdUseCase } from "@/domain/use-cases/get-building-by-id-use-case";
import { PrismaBuildingsRepository } from "@/infra/prisma/repositories/prisma-buildings-repository";
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository";
import { type Request, type Response } from "express";
import { getBuildingByIdParamsSchema } from "../schemas/buildings";
import { BuildingPresenter } from "../presenters/building-presenter";

export class GetBuildingByIdController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const buildingsRepository = new PrismaBuildingsRepository()

        const getBuildingById = new GetBuildingByIdUseCase(usersRepository, buildingsRepository)

        const { buildingId } = getBuildingByIdParamsSchema.parse(req.params)

        const { building } = await getBuildingById.execute({ userId: req.user!.sub, buildingId })

        res.status(200).json(BuildingPresenter.toHTTP(building))
    }
}