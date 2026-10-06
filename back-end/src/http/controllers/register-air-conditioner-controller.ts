import { type Request, type Response } from "express";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { PrismaAirConditionersRepository } from "../../repositories/prisma/prisma-air-conditioners-repository";
import { registerAirConditionerBodySchema } from "../schemas/air-conditioners";
import { RegisterAirConditionerUseCase } from "../../use-cases/register-air-conditioner-use-case";

export class RegisterAirConditionerController {
    async handle(req: Request, res: Response) {
        const roomsRepository = new PrismaRoomsRepository()
        const airConditionersRepository = new PrismaAirConditionersRepository()

        const registerAirConditioner = new RegisterAirConditionerUseCase(roomsRepository, airConditionersRepository)

        const { roomId } = registerAirConditionerBodySchema.parse(req.body)

        await registerAirConditioner.execute({ roomId })

        res.status(201).send()
    }
}