import { z } from "zod";
import { type Request, type Response } from "express";
import { PrismaAirConditionersRepository } from "../repositories/prisma/prisma-air-conditioners-repository";
import { PrismaRoomsRepository } from "../repositories/prisma/prisma-rooms-repository";
import { PrismaFloorsRepository } from "../repositories/prisma/prisma-floors-repository";
import { ListFloorsWithRoomsAndAirConditionersUseCase } from "../use-cases/list-floors-with-rooms-and-acs-use-case";
import { AirConditionerStatus } from "../entities/air-conditioner";
import { PrismaAirConditionerMapper } from "../mappers/prisma-air-conditioner-mapper";
import { AirConditionerPresenter } from "../presenters/air-conditioners-presenter";

const ListAirConditionersQuerySchema = z.object({
    floorId: z.uuid().optional(),
    status: z.enum(AirConditionerStatus).optional()
})

export class ListAirConditionersController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()
        const roomsRepository = new PrismaRoomsRepository()
        const floorsRepository = new PrismaFloorsRepository()

        const listFloorsWithRoomsAndAirConditionersUseCase = new ListFloorsWithRoomsAndAirConditionersUseCase(airConditionersRepository, roomsRepository, floorsRepository)

        const { floorId, status } = ListAirConditionersQuerySchema.parse(req.query)

        const { floorsWithRoomsAndAirConditioners } = await listFloorsWithRoomsAndAirConditionersUseCase.execute({ floorId, status })

        res.status(200).json(floorsWithRoomsAndAirConditioners.map(AirConditionerPresenter.toHTTPGrouped))
    }
}