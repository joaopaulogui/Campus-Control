import { type Request, type Response } from "express";
import { PrismaAirConditionersRepository } from "../../repositories/prisma/prisma-air-conditioners-repository";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { PrismaFloorsRepository } from "../../repositories/prisma/prisma-floors-repository";
import { ListFloorsWithRoomsAndAirConditionersUseCase } from "../../use-cases/list-floors-with-rooms-and-acs-use-case";
import { AirConditionerPresenter } from "../presenters/air-conditioners-presenter";
import { listAirConditionersQuerySchema } from "../schemas/air-conditioners";

export class ListAirConditionersController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()
        const roomsRepository = new PrismaRoomsRepository()
        const floorsRepository = new PrismaFloorsRepository()

        const listFloorsWithRoomsAndAirConditionersUseCase = new ListFloorsWithRoomsAndAirConditionersUseCase(airConditionersRepository, roomsRepository, floorsRepository)

        const { floorId, status } = listAirConditionersQuerySchema.parse(req.query)

        const { floorsWithRoomsAndAirConditioners } = await listFloorsWithRoomsAndAirConditionersUseCase.execute({ floorId, status })

        res.status(200).json(floorsWithRoomsAndAirConditioners.map(AirConditionerPresenter.toHTTPGrouped))
    }
}