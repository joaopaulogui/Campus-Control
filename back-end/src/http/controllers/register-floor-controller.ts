import { type Request, type Response } from 'express'
import { PrismaFloorsRepository } from '../../repositories/prisma/prisma-floors-repository';
import { RegisterFloorUseCase } from '../../use-cases/register-floor-use-case';
import { PrismaBuildingsRepository } from '../../repositories/prisma/prisma-buildings-repository';
import { registerFloorBodySchema } from '../schemas/floors';

export class RegisterFloorController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const buildingsRepository = new PrismaBuildingsRepository()

        const registerFloor = new RegisterFloorUseCase(floorsRepository, buildingsRepository)

        const { name, buildingId } = registerFloorBodySchema.parse(req.body)

        await registerFloor.execute({ name, buildingId })

        res.status(201).send()
    }
}