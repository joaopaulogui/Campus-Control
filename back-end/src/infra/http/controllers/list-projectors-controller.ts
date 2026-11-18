import { type Request, type Response } from "express";
import { PrismaProjectorsRepository } from "../../prisma/repositories/prisma-projectors-repository";
import { ListProjectorsUseCase } from "@/domain/use-cases/list-projectors-use-case";
import { ProjectorPresenter } from "../presenters/projector-presenter";
import { listProjectorsQuerySchema } from "../schemas/projectors";
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository";

export class ListProjectorsController {
    async handle(req: Request, res: Response) {
        const projectorsRepository = new PrismaProjectorsRepository()
        const usersRepository = new PrismaUsersRepository()

        const listProjectorsUseCase = new ListProjectorsUseCase(projectorsRepository, usersRepository)

        const { buildingId, floorId, roomId, status } = listProjectorsQuerySchema.parse(req.query)

        const { projectors } = await listProjectorsUseCase.execute({ 
            userId: req.user!.sub, 
            buildingId, 
            floorId, 
            roomId, 
            status 
        })

        res.status(200).json(projectors.map(ProjectorPresenter.toHTTP))
    }
}