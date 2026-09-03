import { type Request, type Response } from "express"
import { PrismaFloorsRepository } from "../repositories/prisma/prisma-floors-repository"
import { ListAllFloorsUseCase } from "../use-cases/list-all-floors-use-case"
import { FloorPresenter } from "../presenters/floor-presenter"

export class ListAllFloorsController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()

        const listAllFloors = new ListAllFloorsUseCase(floorsRepository)

        const { floors } = await listAllFloors.execute()

        res.status(200).json(floors.map(FloorPresenter.toHTTP))
    }
}