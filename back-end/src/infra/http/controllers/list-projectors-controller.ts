import { type Request, type Response } from "express";
import { PrismaProjectorsRepository } from "../../prisma/repositories/prisma-projectors-repository";
import { PrismaRoomsRepository } from "../../prisma/repositories/prisma-rooms-repository";
import { PrismaFloorsRepository } from "../../prisma/repositories/prisma-floors-repository";
import { ListProjectorsUseCase } from "@/domain/use-cases/list-projectors-use-case";
import { ProjectorPresenter } from "../presenters/projector-presenter";
import { listProjectorsQuerySchema } from "../schemas/projectors";
import { PrismaBuildingsRepository } from "../../prisma/repositories/prisma-buildings-repository";

export class ListProjectorsController {
    async handle(req: Request, res: Response) {
        const projectorsRepository = new PrismaProjectorsRepository()
        const roomsRepository = new PrismaRoomsRepository()
        const floorsRepository = new PrismaFloorsRepository()
        const buildingsRepository = new PrismaBuildingsRepository()

        const listProjectorsUseCase = new ListProjectorsUseCase(
            projectorsRepository, 
            roomsRepository, 
            floorsRepository, 
            buildingsRepository
        )

        const { buildingId, floorId, status } = listProjectorsQuerySchema.parse(req.query)

        const { projectors } = await listProjectorsUseCase.execute({ buildingId, floorId, status })

        res.status(200).json(projectors.map(ProjectorPresenter.toHTTP))
    }
}