import { type Request, type Response } from "express";
import { z } from "zod";
import { PrismaAirConditionersRepository } from "../repositories/prisma/prisma-air-conditioners-repository";
import { ToggleAirConditionerUseCase } from "../use-cases/toggle-air-conditioner-use-case";

const ToggleAirConditionerParamsSchema = z.object({
    airConditionerId: z.uuid()
})

export class ToggleAirConditionerController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()

        const toggleAirConditioner = new ToggleAirConditionerUseCase(airConditionersRepository)

        const { airConditionerId } = ToggleAirConditionerParamsSchema.parse(req.params)

        await toggleAirConditioner.execute({ id: airConditionerId })

        res.status(200).send()
    }
}