import { type Request, type Response } from "express";
import { PrismaAirConditionersRepository } from "../../repositories/prisma/prisma-air-conditioners-repository";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { PrismaFloorsRepository } from "../../repositories/prisma/prisma-floors-repository";
import { ListFloorsWithRoomsAndAirConditionersUseCase } from "../../use-cases/list-floors-with-rooms-and-acs-use-case";
import { AirConditionerPresenter } from "../presenters/air-conditioners-presenter";
import { listAirConditionersQuerySchema } from "../schemas/air-conditioners";
import { PrismaBuildingsRepository } from "../../repositories/prisma/prisma-buildings-repository";

export class ListAirConditionersController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()
        const roomsRepository = new PrismaRoomsRepository()
        const floorsRepository = new PrismaFloorsRepository()
        const buildingsRepository = new PrismaBuildingsRepository()

        const listFloorsWithRoomsAndAirConditionersUseCase = new ListFloorsWithRoomsAndAirConditionersUseCase(
            airConditionersRepository, 
            roomsRepository, 
            floorsRepository, 
            buildingsRepository
        )

        const { buildingId, floorId, status } = listAirConditionersQuerySchema.parse(req.query)

        const { floorsWithRoomsAndAirConditioners } = await listFloorsWithRoomsAndAirConditionersUseCase.execute({ buildingId, floorId, status })

        res.status(200).json(floorsWithRoomsAndAirConditioners.map(AirConditionerPresenter.toHTTPGrouped))
    }
}