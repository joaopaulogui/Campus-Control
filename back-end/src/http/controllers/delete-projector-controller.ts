import { type Request, type Response } from "express"
import { PrismaProjectorsRepository } from "../../repositories/prisma/prisma-projectors-repository"
import { DeleteProjectorUseCase } from "../../use-cases/delete-projector-use-case"
import { deleteProjectorParamsSchema } from "../schemas/projectors"

export class DeleteProjectorController {
    async handle(req: Request, res: Response) {
        const projectorsRepository = new PrismaProjectorsRepository()

        const deleteProjector = new DeleteProjectorUseCase(projectorsRepository)

        const { projectorId } = deleteProjectorParamsSchema.parse(req.params)

        await deleteProjector.execute({ projectorId })

        res.status(204).send()
    }
}