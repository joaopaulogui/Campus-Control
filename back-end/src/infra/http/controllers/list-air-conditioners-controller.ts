import { type Request, type Response } from "express";
import { PrismaAirConditionersRepository } from "../../prisma/repositories/prisma-air-conditioners-repository";
import { PrismaRoomsRepository } from "../../prisma/repositories/prisma-rooms-repository";
import { PrismaFloorsRepository } from "../../prisma/repositories/prisma-floors-repository";
import { ListAirConditionersUseCase } from "@/domain/use-cases/list-air-conditioners-use-case";
import { AirConditionerPresenter } from "../presenters/air-conditioners-presenter";
import { listAirConditionersQuerySchema } from "../schemas/air-conditioners";
import { PrismaBuildingsRepository } from "../../prisma/repositories/prisma-buildings-repository";

export class ListAirConditionersController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()
        const roomsRepository = new PrismaRoomsRepository()
        const floorsRepository = new PrismaFloorsRepository()
        const buildingsRepository = new PrismaBuildingsRepository()

        const listAirConditionersUseCase = new ListAirConditionersUseCase(
            airConditionersRepository, 
            roomsRepository, 
            floorsRepository, 
            buildingsRepository
        )

        const { buildingId, floorId, status } = listAirConditionersQuerySchema.parse(req.query)

        const { airConditioners } = await listAirConditionersUseCase.execute({ buildingId, floorId, status })

        res.status(200).json(airConditioners.map(AirConditionerPresenter.toHTTP))
    }
}