import { type Request, type Response } from "express";
import { PrismaAirConditionersRepository } from "../repositories/prisma/prisma-air-conditioners-repository";
import { ToggleAirConditionerUseCase } from "../use-cases/toggle-air-conditioner-use-case";
import { toggleAirConditionerParamsSchema } from "../http/schemas/air-conditioners";

export class ToggleAirConditionerController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()

        const toggleAirConditioner = new ToggleAirConditionerUseCase(airConditionersRepository)

        const { airConditionerId } = toggleAirConditionerParamsSchema.parse(req.params)

        await toggleAirConditioner.execute({ id: airConditionerId })

        res.status(200).send()
    }
}