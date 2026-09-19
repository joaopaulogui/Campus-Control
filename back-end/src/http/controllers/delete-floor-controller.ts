import { type Request, type Response } from "express";
import { PrismaFloorsRepository } from "../../repositories/prisma/prisma-floors-repository";
import { DeleteFloorUseCase } from "../../use-cases/delete-floor-use-case";
import { deleteFloorParamsSchema } from "../schemas/floors";

export class DeleteFloorController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()

        const deleteFloor = new DeleteFloorUseCase(floorsRepository)

        const { floorId } = deleteFloorParamsSchema.parse(req.params)

        await deleteFloor.execute({ floorId })

        res.status(204).send()
    }
}