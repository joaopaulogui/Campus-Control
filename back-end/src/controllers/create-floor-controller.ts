import { type Request, type Response } from 'express'
import { PrismaFloorsRepository } from '../repositories/prisma/prisma-floors-repository';
import { CreateFloorUseCase } from '../use-cases/create-floor-use-case';
import { PrismaBuildingsRepository } from '../repositories/prisma/prisma-buildings-repository';
import { createFloorBodySchema } from '../http/schemas/floors';

export class CreateFloorController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const buildingsRepository = new PrismaBuildingsRepository()

        const createFloor = new CreateFloorUseCase(floorsRepository, buildingsRepository)

        const { name, buildingId } = createFloorBodySchema.parse(req.body)

        await createFloor.execute({ name, buildingId })

        res.status(201).send()
    }
}