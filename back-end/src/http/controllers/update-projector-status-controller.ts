import { type Request, type Response } from "express"
import { PrismaProjectorsRepository } from "../../repositories/prisma/prisma-projectors-repository"
import { UpdateProjectorStatusUseCase } from "../../use-cases/update-projector-status-use-case"
import { updateProjectorStatusBodySchema, updateProjectorStatusParamsSchema } from "../schemas/projectors"

export class UpdateProjectorStatusController {
    async handle(req: Request, res: Response) {
        const projectorsRepository = new PrismaProjectorsRepository()

        const updateProjector = new UpdateProjectorStatusUseCase(projectorsRepository)

        const { projectorId } = updateProjectorStatusParamsSchema.parse(req.params)
        const { status } = updateProjectorStatusBodySchema.parse(req.body)

        await updateProjector.execute({ projectorId, status })

        res.status(204).send()
    }
}