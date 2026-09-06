import { type Request, type Response } from "express";
import { z } from "zod";
import { PrismaBuildingsRepository } from "../repositories/prisma/prisma-buildings-repository";
import { CreateBuildingUseCase } from "../use-cases/create-building-use-case";

const CreateBuildingBodySchema = z.object({
    name: z.string()
})

export class CreateBuildingController {
    async handle(req: Request, res: Response) {
        const buildingsRepository = new PrismaBuildingsRepository()

        const createBuilding = new CreateBuildingUseCase(buildingsRepository)

        const { name } = CreateBuildingBodySchema.parse(req.body)

        await createBuilding.execute({ name, })

        res.status(201).send()
    }
}