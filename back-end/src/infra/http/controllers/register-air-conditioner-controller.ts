import { type Request, type Response } from "express";
import { PrismaRoomsRepository } from "../../prisma/repositories/prisma-rooms-repository";
import { PrismaAirConditionersRepository } from "../../prisma/repositories/prisma-air-conditioners-repository";
import { registerAirConditionerBodySchema } from "../schemas/air-conditioners";
import { RegisterAirConditionerUseCase } from "@domain/use-cases/register-air-conditioner-use-case";

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