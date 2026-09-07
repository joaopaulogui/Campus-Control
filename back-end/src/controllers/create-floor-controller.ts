import { type Request, type Response } from 'express'
import { z } from "zod";
import { PrismaFloorsRepository } from '../repositories/prisma/prisma-floors-repository';
import { CreateFloorUseCase } from '../use-cases/create-floor-use-case';
import { PrismaBuildingsRepository } from '../repositories/prisma/prisma-buildings-repository';

const CreateFloorBodySchema = z.object({
    name: z.string(),
    buildingId: z.uuid(),
})

export class CreateFloorController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const buildingsRepository = new PrismaBuildingsRepository()

        const createFloor = new CreateFloorUseCase(floorsRepository, buildingsRepository)

        const { name, buildingId } = CreateFloorBodySchema.parse(req.body)

        await createFloor.execute({ name, buildingId })

        res.status(201).send()
    }
}