import { type Request, type Response } from "express";
import { PrismaProjectorsRepository } from "../../prisma/repositories/prisma-projectors-repository";
import { PrismaRoomsRepository } from "../../prisma/repositories/prisma-rooms-repository";
import { RegisterProjectorUseCase } from "@domain/use-cases/register-projector-use-case";
import { registerProjectorBodySchema } from "../schemas/projectors";

export class RegisterProjectorController {
    async handle(req: Request, res: Response) {
        const projectorsRepository = new PrismaProjectorsRepository()
        const roomsRepository = new PrismaRoomsRepository()

        const registerProjector = new RegisterProjectorUseCase(projectorsRepository, roomsRepository)

        const { roomId } = registerProjectorBodySchema.parse(req.body)

        await registerProjector.execute({ roomId, })

        res.status(201).send()
    }
}