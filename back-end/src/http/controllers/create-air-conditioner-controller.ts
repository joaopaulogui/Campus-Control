import { type Request, type Response } from "express";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { PrismaAirConditionersRepository } from "../../repositories/prisma/prisma-air-conditioners-repository";
import { CreateAirConditionerUseCase } from "../../use-cases/create-air-conditioner-use-case";
import { createAirConditionerBodySchema } from "../schemas/air-conditioners";

export class CreateAirConditionerController {
    async handle(req: Request, res: Response) {
        const roomsRepository = new PrismaRoomsRepository()
        const airConditionersRepository = new PrismaAirConditionersRepository()

        const createAirConditioner = new CreateAirConditionerUseCase(roomsRepository, airConditionersRepository)

        const { roomId } = createAirConditionerBodySchema.parse(req.body)

        await createAirConditioner.execute({ roomId })

        res.status(201).send()
    }
}