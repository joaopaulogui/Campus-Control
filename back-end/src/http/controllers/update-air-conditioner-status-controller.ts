import { type Request, type Response } from "express"
import { PrismaAirConditionersRepository } from "../../repositories/prisma/prisma-air-conditioners-repository"
import { UpdateAirConditionerStatusUseCase } from "../../use-cases/update-air-conditioner-status-use-case"
import { updateAirConditionerStatusBodySchema, updateAirConditionerStatusParamsSchema } from "../schemas/air-conditioners"

export class UpdateAirConditionerStatusController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()

        const updateAirConditioner = new UpdateAirConditionerStatusUseCase(airConditionersRepository)

        const { airConditionerId } = updateAirConditionerStatusParamsSchema.parse(req.params)
        const { status } = updateAirConditionerStatusBodySchema.parse(req.body)

        await updateAirConditioner.execute({ airConditionerId, status })

        res.status(204).send()
    }
}