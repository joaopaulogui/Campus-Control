import { type Request, type Response } from "express";
import { PrismaProjectorsRepository } from "../../repositories/prisma/prisma-projectors-repository";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { RegisterProjectorUseCase } from "../../use-cases/register-projector-use-case";
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