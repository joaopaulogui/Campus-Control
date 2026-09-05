import { type Request, type Response } from 'express'
import { z } from "zod";
import { PrismaFloorsRepository } from '../repositories/prisma/prisma-floors-repository';
import { CreateFloorUseCase } from '../use-cases/create-floor-use-case';

const CreateFloorBodySchema = z.object({
    name: z.string()
})

export class CreateFloorController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()

        const createFloor = new CreateFloorUseCase(floorsRepository)

        const { name } = CreateFloorBodySchema.parse(req.body)

        await createFloor.execute({ name })

        res.status(201).send()
    }
}