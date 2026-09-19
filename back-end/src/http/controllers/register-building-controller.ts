import { type Request, type Response } from "express";
import { PrismaBuildingsRepository } from "../../repositories/prisma/prisma-buildings-repository";
import { RegisterBuildingUseCase } from "../../use-cases/register-building-use-case";
import { registerBuildingBodySchema } from "../schemas/buildings";

export class RegisterBuildingController {
    async handle(req: Request, res: Response) {
        const buildingsRepository = new PrismaBuildingsRepository()

        const registerBuilding = new RegisterBuildingUseCase(buildingsRepository)

        const { name } = registerBuildingBodySchema.parse(req.body)

        await registerBuilding.execute({ name, })

        res.status(201).send()
    }
}