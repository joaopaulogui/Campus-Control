import { type Request, type Response } from "express";
import { PrismaAirConditionersRepository } from "../../prisma/repositories/prisma-air-conditioners-repository";
import { DeleteAirConditionerUseCase } from "@domain/use-cases/delete-air-conditioner-use-case";
import { deleteAirConditionerParamsSchema } from "../schemas/air-conditioners";

export class DeleteAirConditionerController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()

        const deleteAirConditioner = new DeleteAirConditionerUseCase(airConditionersRepository)

        const { airConditionerId } = deleteAirConditionerParamsSchema.parse(req.params)

        await deleteAirConditioner.execute({ airConditionerId })

        res.status(204).send()
    }
}